const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/produto/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE idProduct = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar detalhes do produto:', err);
      return res.status(500).send('Erro ao buscar detalhes do produto');
    }
    if (results.length === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(results[0]);
  });
});

app.put('/editarProduto/:id', (req, res) => {
  const { id } = req.params;
  const { nome, size, price, description, category } = req.body;
  const sql = 'UPDATE products SET nameProduct = ?, sizeProduct = ?, priceProduct = ?, descriptionProduct = ?, categoryProduct = ? WHERE idProduct = ?';

  db.query(sql, [nome, size, price, description, category, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto atualizado com sucesso!' });
  });
});


app.delete('/deletarProduto/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE idProduct = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).send('Erro ao deletar produto');
    } else {
      res.status(200).send('Produto deletado com sucesso');
    }
  });
});

app.get('/api/produtos', (req, res) => {
  const category = req.query.category;
  const query = 'SELECT * FROM products WHERE categoryProduct = ?';
  db.query(query, [category], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
    res.json(results);
  });
});

app.get('/api/search', (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.status(400).json({ error: 'Necessita de um nome' });
  }
  const sql = 'SELECT * FROM products WHERE nameProduct LIKE ?';
  const values = [`%${searchQuery}%`];
  db.query(sql, values, (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: 'Admin', isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, username: 'Admin', isAdmin: true });
  }

  const sql = 'SELECT * FROM users WHERE emailUser = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) return res.status(401).json({ message: 'Usuário não encontrado' });

    const user = results[0];
    bcrypt.compare(password, user.passwordUser, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!isMatch) return res.status(401).json({ message: 'Senha incorreta' });

      const token = jwt.sign({ id: user.idUser, username: user.nameUser, isAdmin: false }, JWT_SECRET, { expiresIn: '1h' });

      const fullName = user.nameUser;
      const firstName = fullName.split(' ')[0];
      res.json({ token, 
        username: firstName,
        isAdmin: false
      });
    });
  });
});

const saltRounds = 10;
app.post('/api/cadastroUser', (req, res) => {
  const { nome, email, password } = req.body;
  const sql = 'INSERT INTO users (nameUser, emailUser, passwordUser) VALUES (?, ?, ?)';

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(sql, [nome, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).send('Erro ao inserir dados');
      } else {
        res.status(200).send('Usuário cadastrado com sucesso');
      }
    });
  });
});

app.post('/api/cadastroProduto', authenticateToken, upload.single('imagemProd'), (req, res) => {
  const { nomeProd, tamanhoProd, precoProd, descriptionProd, categoriaProd } = req.body;
  const filePath = req.file.path;

  const sql = 'INSERT INTO products (nameProduct, sizeProduct, priceProduct, imageProduct, descriptionProduct, categoryProduct) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nomeProd, tamanhoProd, precoProd, filePath, descriptionProd, categoriaProd];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
    } else {
      res.status(200).send('Produto cadastrado com sucesso');
    }
  });
});

app.use('/uploads', express.static('uploads'));

app.get('/cart', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT cart.idCart, cart.user_id, cart.product_id, cart.size, products.nameProduct, products.priceProduct, products.descriptionProduct, products.imageProduct, products.sizeProduct FROM cart JOIN products ON cart.product_id = products.idProduct WHERE cart.user_id = ?';
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar itens do carrinho:', err);
      res.status(500).send('Erro ao buscar itens do carrinho');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/addCart', authenticateToken, (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user.id;

  const sql = 'INSERT INTO cart (user_id, product_id, size) VALUES (?, ?, ?)';

  db.query(sql, [userId, productId, size], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
    } else {
      res.status(200).send('Produto adicionado ao carrinho com sucesso');
    }
  });
});

app.delete('/removeCart/:idCart', authenticateToken, (req, res) => {
  const { idCart } = req.params;
  const sql = 'DELETE FROM cart WHERE idCart = ?';
  
  db.query(sql, [idCart], (err, result) => {
    if (err) {
      console.error('Erro ao remover produto do carrinho:', err);
      res.status(500).send('Erro ao remover produto do carrinho');
    } else {
      res.status(200).send('Produto removido do carrinho com sucesso');
    }
  });
});

app.delete('/clearCart', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'DELETE * FROM cart WHERE user_id = ?';
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao limpar o carrinho:', err);
      res.status(500).send('Erro ao limpar o carrinho');
    } else {
      res.status(200).send('Carrinho limpo com sucesso');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
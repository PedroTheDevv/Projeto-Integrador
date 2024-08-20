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

// Middleware para verificar o token
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
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adiciona um timestamp ao nome do arquivo
  }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'projetoIntegrador'
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
  db.query('SELECT * FROM products WHERE idProduct = ?', [id], (err, results) => {
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
  const { nomeProd, tamanhoProd, precoProd, descriptionProd } = req.body;
  const filePath = req.file.path;

  const sql = 'INSERT INTO products (nameProduct, sizeProduct, priceProduct, imageProduct, descriptionProduct) VALUES (?, ?, ?, ?, ?)';
  const values = [nomeProd, tamanhoProd, precoProd, filePath, descriptionProd];

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

app.post('/addCart', authenticateToken, (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user.id;

  const sql = 'INSERT INTO cart (user_id, product_id, quantity, size) VALUES (?, ?, ?, ?)';

  db.query(sql, [userId, productId, quantity, size], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
    } else {
      res.status(200).send('Produto adicionado ao carrinho com sucesso');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
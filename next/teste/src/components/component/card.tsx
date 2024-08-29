import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './pagination';
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import '../styles/card.css';

export function CardProduct() {

  interface Product {
    id: number;
    nameProduct: string;
    priceProduct: number;
    imageProduct: string;
  }

  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => setData(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const [value, setValue] = React.useState('1')

  return (
    <>
      <div className="container">
        <div className="topico">
          <p>Todos os Produtos</p>
        </div>
        <div className="rowcards">
          {data.map(item => (
            <Card className="w-full max-w-sm">
              <img
                src={`http://localhost:5000/${item.imageProduct}`}
                alt={item.nameProduct}
                width={400}
                height={500}
                className="rounded-t-lg object-cover w-full aspect-[4/5]"
              />
              <CardContent className="p-4 grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{item.nameProduct}</h3>
                  <div className="text-2xl font-bold">${item.priceProduct}</div>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="size">Size</Label>
                  <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
                    <Label
                      htmlFor="size-s"
                      className="border cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                    >
                      <RadioGroupItem id="size-s" value="s" />
                      S
                    </Label>
                    <Label
                      htmlFor="size-m"
                      className="border cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                    >
                      <RadioGroupItem id="size-m" value="m" />
                      M
                    </Label>
                    <Label
                      htmlFor="size-l"
                      className="border cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                    >
                      <RadioGroupItem id="size-l" value="l" />
                      L
                    </Label>
                    <Label
                      htmlFor="size-xl"
                      className="border cursor-pointer rounded-md px-3 py-1 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                    >
                      <RadioGroupItem id="size-xl" value="xl" />
                      XL
                    </Label>
                  </RadioGroup>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button className="flex-1">Buy Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

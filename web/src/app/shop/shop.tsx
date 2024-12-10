"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      let response = await fetch("/api/product");
      let data = await response.json();
      setProducts(data.products);
    } catch {
      setProducts([]);
    }
  }

  async function addCart(product: Product) {
    const username = Cookies.get("username");
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username ? username : "",
          product_id: product.id,
          count: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) return <div>Loading...</div>;

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {products.map((product) => {
        return (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent className="flex flex-col gap-4">
              <img
                src={product.image_url}
                className="rounded-xl"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/200")
                }
              />
              <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex flex-row justify-between">
              ${product.price.toFixed(2)}
              <Button
                onClick={() => {
                  console.log("sd");
                  addCart(product);
                }}
              >
                <ShoppingCart />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

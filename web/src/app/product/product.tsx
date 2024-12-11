"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/product");
      const data = await response.json();
      setProducts(data.products);
    } catch {
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) return <div>Loading...</div>;

  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs text-center pl-2 md:pl-6 w-10">
              ID
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              TITLE
            </TableHead>
            <TableHead className="font-semibold text-xs hidden md:table-cell">
              DESCRIPTION
            </TableHead>
            <TableHead className="font-semibold text-xs">
              <div className="flex flex-row gap-2">
                <p>IMAGE</p>
                <p className="hidden 2xl:block">URL</p>
              </div>
            </TableHead>
            <TableHead className="font-semibold text-xs">PRICE</TableHead>
            <TableHead className="font-semibold text-xs text-center">
              <p className="hidden lg:block">QUANTITY</p>
              <p className="block lg:hidden">COUNT</p>
            </TableHead>
            <TableHead className="w-8 p-0 sm:px-4" />
            <TableHead className="p-0 sm:px-2 md:pr-6 w-8">
              <Button
                variant="ghost"
                className="rounded-full w-8 h-8 hover:opacity-80 active:opacity-60"
                onClick={() => {
                  fetchProducts();
                }}
              >
                <RefreshCw />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              className="cursor-default text-foreground"
            >
              <TableCell className="text-center pl-2 md:pl-6 w-10">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">{product.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="hidden lg:block">{product.description}</p>
                <p className="block lg:hidden">
                  {product.description.substring(0, 20)}...
                </p>
              </TableCell>
              <TableCell>
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={product.image_url}
                    className="w-8 h-8 rounded-sm"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/200")
                    }
                  />
                  <p className="hidden 2xl:block">{product.image_url}</p>
                </div>
              </TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="p-0 sm:px-2 w-8">
                <Button
                  variant="ghost"
                  className="rounded-full w-8 h-8 hover:opacity-80 active:opacity-60"
                >
                  <Pencil />
                </Button>
              </TableCell>
              <TableCell className="p-0 sm:px-2 md:pr-6 w-8">
                <Button
                  variant="ghost"
                  className="rounded-full w-8 h-8 hover:opacity-80 active:opacity-60"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

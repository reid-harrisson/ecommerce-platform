"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
}

export default function ShopItem({ product }: { product: Product }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const addCart = async () => {
    setIsLoading(true);
    try {
      const username = Cookies.get("username");
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
      if (!data.error) {
        toast({
          title: "Success",
          description: "Product successfully added to cart.",
        });
      } else {
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to add product to cart.",
        });
      }
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to add product to cart.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="grid grid-rows-[auto_1fr_auto]">
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
        <Button onClick={addCart} disabled={isLoading}>
          <ShoppingCart />
          Add to Cart
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </CardFooter>
    </Card>
  );
}

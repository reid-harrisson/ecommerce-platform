"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ShopItem from "./item";
import ShopSkeleton from "./skeleton";

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
      } catch {
        setProducts([]);
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to get products.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {isLoading
        ? Array.from({ length: 3 }, (_, i) => <ShopSkeleton key={i} />)
        : products.map((product) => (
            <ShopItem key={product.id} product={product} />
          ))}
    </div>
  );
}

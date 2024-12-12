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
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Loader2, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Cart {
  id: number;
  username: string;
  product_id: number;
  product: string;
  price: number;
  count: number;
  image_url: string;
  sum: number;
}

export default function Cart() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0); // Corrected typo in state name
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchCarts = async () => {
    setIsLoading(true);
    try {
      const username = Cookies.get("username");
      const url = `/api/cart${username ? `?username=${username}` : ""}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.carts) {
          setCarts(data.carts);
          setTotalPrice(data.total_price);
        }
      }
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to get shopping cart.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const processOrder = async () => {
    setIsProcessing(true);
    try {
      const username = Cookies.get("username");
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });
      const data = await response.json();
      if (data.error)
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to process order.",
        });
      else
        toast({
          title: "Success",
          description: "Order is successfully added.",
        });
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to process order.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      {isLoading ? (
        <Table>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="bg-primary-foreground h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-primary-foreground h-6" />
                </TableCell>
                <TableCell className="w-12">
                  <Skeleton className="bg-primary-foreground w-12 h-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-primary-foreground h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-primary-foreground h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="bg-primary-foreground h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-xs px-6">ID</TableHead>
              <TableHead className="font-semibold text-xs px-6">
                PRODUCT
              </TableHead>
              <TableHead className="font-semibold text-xs px-6">
                IMAGE
              </TableHead>
              <TableHead className="font-semibold text-xs px-6">
                PRICE
              </TableHead>
              <TableHead className="font-semibold text-xs text-center">
                COUNT
              </TableHead>
              <TableHead className="font-semibold text-xs px-6">
                SUBTOTAL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts.map((cart, index) => (
              <TableRow
                key={cart.id}
                className="cursor-default text-foreground"
              >
                <TableCell className="px-6">{index + 1}</TableCell>
                <TableCell className="px-6">{cart.product}</TableCell>
                <TableCell className="px-6">
                  <img
                    src={cart.image_url}
                    className="w-12 h-12 rounded-xl"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/200")
                    }
                  />
                </TableCell>
                <TableCell className="px-6">${cart.price.toFixed(2)}</TableCell>
                <TableCell className="px-6">
                  <div className="flex items-center gap-1 justify-center">
                    <Button size="icon" className="rounded-full w-5 h-5 p-0">
                      <Minus size={12} />
                    </Button>
                    <Input
                      defaultValue={cart.count}
                      type="number"
                      className="w-14 px-2"
                    />
                    <Button size="icon" className="rounded-full w-5 h-5 p-0">
                      <Plus size={12} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="px-6">${cart.sum.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="text-foreground">
              <TableCell colSpan={4} />
              <TableCell className="font-semibold text-xs text-center">
                TOTAL
              </TableCell>
              <TableCell className="px-6">${totalPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>
                <div className="flex flex-row justify-center">
                  <Button
                    onClick={processOrder}
                    disabled={isProcessing}
                    className="w-40"
                  >
                    {isProcessing && <Loader2 className="animate-spin" />}
                    Order
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

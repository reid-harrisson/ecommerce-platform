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
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [totalPrice, setTotolPrice] = useState(0);
  const { toast } = useToast();

  async function fetchCarts() {
    try {
      const username = Cookies.get("username");
      let url = "/api/cart";
      if (username) {
        url += `?username=${username}`;
      }
      let response = await fetch(url);
      let data = await response.json();
      setCarts(data.carts);
      setTotolPrice(data.total_price);
    } catch {
      setCarts([]);
      setTotolPrice(0);
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed get products.",
      });
    }
  }

  useEffect(() => {
    fetchCarts();
  }, []);

  async function processOrder() {
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
          description: "Failed get products.",
        });
      else
        toast({
          title: "Success",
          description: "Order is successfully added.",
        });
    } catch (error) {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed get products.",
      });
    }
  }

  if (!carts) return <div>Loading...</div>;

  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs text-center">
              ID
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              PROUDCT
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              IMAGE
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              PRICE
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              COUNT
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              SUBTOTAL
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.map((cart, index) => (
            <TableRow key={cart.id} className="cursor-default text-foreground">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{cart.product}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center">
                  <img
                    src={cart.image_url}
                    className="w-14 h-14 rounded-xl"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/200")
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                ${cart.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Input
                    type="number"
                    placeholder={`${cart.count}`}
                    max={10}
                    min={0}
                    className="w-20"
                    onChange={(event) => {
                      event.target.value;
                    }}
                  />
                  <Button size="icon" className="rounded-full w-6 h-6">
                    <Check />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                ${cart.sum.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="text-foreground">
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell className="font-semibold text-xs text-center">
              TOTAL
            </TableCell>
            <TableCell className="text-center">
              ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell>
              <Button
                className="w-full"
                onClick={async () => {
                  await processOrder();
                }}
              >
                Order
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

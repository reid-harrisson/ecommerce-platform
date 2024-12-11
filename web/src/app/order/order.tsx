"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Save } from "lucide-react";

interface Order {
  id: number;
  username: string;
  product_id: number;
  count: number;
  order_id: number;
}

export default function Order() {
  const [carts, setCarts] = useState<Order[]>([]);
  const [totalPrice, setTotolPrice] = useState(0);

  async function fetchCarts() {
    try {
      let url = "/api/order";
      let response = await fetch(url);
      let data = await response.json();
      setCarts(data.carts);
      setTotolPrice(data.total_price);
    } catch {
      setCarts([]);
      setTotolPrice(0);
    }
  }

  useEffect(() => {
    fetchCarts();
  }, []);

  if (!carts) return <div>Loading...</div>;

  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs px-6 py-3">
              ID
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
              USERNAME
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
              PROUDCT ID
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              COUNT
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carts.map((order, index) => (
            <TableRow key={order.id} className="cursor-default text-foreground">
              <TableCell className="px-6 py-3">{order.order_id}</TableCell>
              <TableCell className="px-6 py-3">{order.username}</TableCell>
              <TableCell className="px-6 py-3">{order.product_id}</TableCell>
              <TableCell className="text-center">{order.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

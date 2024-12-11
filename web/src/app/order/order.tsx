"use client";

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

interface Order {
  id: number;
  username: string;
  product_id: number;
  count: number;
  order_id: number;
}

export default function Order() {
  const [carts, setCarts] = useState<Order[]>([]);

  async function fetchOrders() {
    try {
      const url = "/api/order";
      const response = await fetch(url);
      const data = await response.json();
      setCarts(data.carts);
    } catch {
      setCarts([]);
    }
  }

  useEffect(() => {
    fetchOrders();
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
          {carts.map((order) => (
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

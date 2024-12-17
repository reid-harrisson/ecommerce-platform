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
import { Skeleton } from "@/components/ui/skeleton";

interface Order {
  id: number;
  username: string;
  product_id: number;
  count: number;
  order_id: number;
}

export default function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchOrders() {
    setIsLoading(true);
    try {
      const url = "/api/order";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data.orders) setOrders(data.orders);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

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
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-default text-foreground"
              >
                <TableCell className="px-6 py-3">{order.order_id}</TableCell>
                <TableCell className="px-6 py-3">{order.username}</TableCell>
                <TableCell className="px-6 py-3">{order.product_id}</TableCell>
                <TableCell className="text-center">{order.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

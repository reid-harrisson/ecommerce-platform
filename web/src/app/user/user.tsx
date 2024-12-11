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

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      let response = await fetch("/api/user");
      let data = await response.json();
      setUsers(data.users);
    } catch {
      setUsers([]);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) return <div>Loading...</div>;

  return (
    <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-xs text-center">
              USERNAME
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              EMAIL
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              FIRST NAME
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              LAST NAME
            </TableHead>
            <TableHead className="font-semibold text-xs text-center">
              ROLE
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((product, index) => (
            <TableRow
              key={product.username}
              className="cursor-default text-foreground"
            >
              <TableCell className="text-center">{product.username}</TableCell>
              <TableCell className="text-center">{product.email}</TableCell>
              <TableCell className="text-center">
                {product.first_name}
              </TableCell>
              <TableCell className="text-center">{product.last_name}</TableCell>
              <TableCell className="text-center">{product.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

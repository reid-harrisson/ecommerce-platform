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
            <TableHead className="font-semibold text-xs px-6 py-3">
              USERNAME
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
              EMAIL
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
              FIRST NAME
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
              LAST NAME
            </TableHead>
            <TableHead className="font-semibold text-xs px-6 py-3">
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
              <TableCell className="px-6 py-3">{product.username}</TableCell>
              <TableCell className="px-6 py-3">{product.email}</TableCell>
              <TableCell className="px-6 py-3">{product.first_name}</TableCell>
              <TableCell className="px-6 py-3">{product.last_name}</TableCell>
              <TableCell className="px-6 py-3">{product.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

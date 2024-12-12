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

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data.users);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
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
            {users.map((product) => (
              <TableRow
                key={product.username}
                className="cursor-default text-foreground"
              >
                <TableCell className="px-6 py-3">{product.username}</TableCell>
                <TableCell className="px-6 py-3">{product.email}</TableCell>
                <TableCell className="px-6 py-3">
                  {product.first_name}
                </TableCell>
                <TableCell className="px-6 py-3">{product.last_name}</TableCell>
                <TableCell className="px-6 py-3">{product.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

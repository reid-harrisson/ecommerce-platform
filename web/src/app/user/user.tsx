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
import { Badge } from "@/components/ui/badge";
import { UserSheet } from "./sheet";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "manager" | "admin";
}

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        if (data.users) setUsers(data.users);
      }
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
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.username}
                className="cursor-default text-foreground"
              >
                <TableCell className="px-6 py-3">{user.username}</TableCell>
                <TableCell className="px-6 py-3">{user.email}</TableCell>
                <TableCell className="px-6 py-3">{user.first_name}</TableCell>
                <TableCell className="px-6 py-3">{user.last_name}</TableCell>
                <TableCell className="px-6 py-3">
                  <Badge variant={user.role}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <UserSheet
                    user={user}
                    updateUser={() => {
                      fetchUsers();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}

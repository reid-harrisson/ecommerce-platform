import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: number;
  quantity: number;
}

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="border-b">
          <TableHead className="px-6">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image URL</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center w-24 px-4"></TableHead>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="cursor-default">
              <TableCell className="px-6">{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.image_url}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="flex gap-1 justify-center w-24 px-4">
                <Button
                  variant="ghost"
                  className="rounded-full w-8 h-8 hover:opacity-80 active:opacity-60"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full w-8 h-8 hover:opacity-80 active:opacity-60"
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

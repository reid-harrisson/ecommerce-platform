"use client";

import { ThemeChanger } from "@/components/theme-changer";
import { Button } from "@/components/ui/button";
import {
  NotebookPen,
  PackageOpen,
  ScrollText,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode; // Ensure children prop is correctly typed
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[max-content_1fr] h-full">
      <Card className="grid grid-cols-[max-content_auto_max-content] items-center px-8 py-4 gap-2 z-20">
        <ShoppingBag size={24} color="hsl(var(--primary))" />
        <h1 className="font-semibold text-xl text-secondary-foreground">
          Ecommerce Platform
        </h1>
        <ThemeChanger />
      </Card>
      <div className="grid grid-cols-[max-content_1fr] overflow-hidden">
        <Card className="py-2 z-10 flex flex-col">
          <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
            Customer
          </p>
          <Button
            variant="ghost"
            className="justify-start px-6"
            onClick={() => {
              router.push("/shop");
            }}
          >
            <PackageOpen /> Products
          </Button>
          <Button
            variant="ghost"
            className="justify-start px-6"
            onClick={() => {
              router.push("/cart");
            }}
          >
            <ShoppingCart /> Shopping Cart
          </Button>
          <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
            Administrator
          </p>
          <Button
            variant="ghost"
            className="justify-start px-6"
            onClick={() => {
              router.push("/product");
            }}
          >
            <NotebookPen /> Product Management
          </Button>
          <Button variant="ghost" className="justify-start px-6">
            <ScrollText /> Order Management
          </Button>
        </Card>
        <ScrollArea className="bg-muted h-full">
          <div className="flex flex-col p-8 gap-4">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

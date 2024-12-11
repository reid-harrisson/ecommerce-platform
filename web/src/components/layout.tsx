"use client";

import { ThemeChanger } from "@/components/theme-changer";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  NotebookPen,
  ScrollText,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LayoutProps {
  children: React.ReactNode; // Ensure children prop is correctly typed
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const role = Cookies.get("role") || "guest";
  const fullname = Cookies.get("fullname") || "";

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <Card className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center px-8 py-4 gap-1 z-20">
        <ShoppingBag size={24} color="hsl(var(--primary))" />
        <h1 className="font-semibold text-xl text-secondary-foreground tracking-tight">
          Ecommerce Platform
        </h1>
        <p className="font-medium text-sm">
          {`${fullname} - ${role[0].toUpperCase()}${role.slice(1)}`}
        </p>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Settings />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() => {
            router.push("/");
            Cookies.remove("user");
            Cookies.remove("role");
            Cookies.remove("acccess");
            Cookies.remove("refresh");
          }}
        >
          <LogOut />
        </Button>
        <ThemeChanger />
      </Card>
      <div className="grid grid-cols-[max-content_1fr] overflow-hidden">
        <Card className="py-2 z-10 flex flex-col">
          {(role == "admin" || role == "manager") && (
            <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
              Customer
            </p>
          )}
          <Button
            variant="ghost"
            className="justify-start px-6"
            onClick={() => {
              router.push("/shop");
            }}
          >
            <ShoppingBasket /> Products
          </Button>
          <Button
            variant="ghost"
            className={
              "justify-start px-6" + (role != "guest" ? "" : " hidden")
            }
            onClick={() => {
              router.push("/cart");
            }}
          >
            <ShoppingCart /> Shopping Cart
          </Button>
          {(role == "admin" || role == "manager") && (
            <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
              Manager
            </p>
          )}
          <Button
            variant="ghost"
            className={
              "justify-start px-6" +
              (role == "admin" || role == "manager" ? "" : " hidden")
            }
            onClick={() => {
              router.push("/product");
            }}
          >
            <NotebookPen /> Product Management
          </Button>
          <Button
            variant="ghost"
            className={
              "justify-start px-6" +
              (role == "admin" || role == "manager" ? "" : " hidden")
            }
            onClick={() => {
              router.push("/order");
            }}
          >
            <ScrollText /> Order Management
          </Button>
          {role == "admin" && (
            <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
              Administrator
            </p>
          )}
          <Button
            variant="ghost"
            className={
              "justify-start px-6" + (role == "admin" ? "" : " hidden")
            }
            onClick={() => {
              router.push("/user");
            }}
          >
            <ScrollText /> User Management
          </Button>
        </Card>
        <ScrollArea className="bg-muted h-full">
          <div className="flex flex-col p-8 gap-4">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

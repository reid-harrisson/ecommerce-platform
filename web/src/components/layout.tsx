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
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface LayoutProps {
  children: React.ReactNode;
  page: string;
}

export function Layout({ children, page }: LayoutProps) {
  const router = useRouter();
  const role = Cookies.get("role") || "guest";
  const fullname = Cookies.get("fullname") || "";

  const handleLogout = () => {
    router.push("/");
    Cookies.remove("username");
    Cookies.remove("fullname");
    Cookies.remove("role");
    Cookies.remove("acccess");
    Cookies.remove("refresh");
  };

  const renderMenuButton = (
    icon: React.ReactNode,
    label: string,
    path: string,
    visible: boolean = true,
    disabled: boolean = false
  ) => (
    <Button
      variant="menu"
      visible={visible}
      disabled={disabled}
      onClick={() => router.push(path)}
    >
      {icon} {label}
    </Button>
  );

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <Card className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center px-8 py-4 gap-1 z-20">
        <ShoppingBag size={24} color="hsl(var(--primary))" />
        <h1 className="font-semibold text-xl text-secondary-foreground tracking-tight">
          Ecommerce Platform
        </h1>
        <p className="font-medium text-sm">{fullname}</p>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Settings />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={handleLogout}
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
          {renderMenuButton(
            <ShoppingBasket />,
            "Products",
            "/shop",
            true,
            page == "shop"
          )}
          {renderMenuButton(
            <ShoppingCart />,
            "Shopping Cart",
            "/cart",
            role != "guest",
            page == "cart"
          )}
          {(role == "admin" || role == "manager") && (
            <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
              Manager
            </p>
          )}
          {renderMenuButton(
            <NotebookPen />,
            "Product Management",
            "/product",
            role == "admin" || role == "manager",
            page == "product"
          )}
          {renderMenuButton(
            <ScrollText />,
            "Order Management",
            "/order",
            role == "admin" || role == "manager",
            page == "order"
          )}
          {role == "admin" && (
            <p className="text-secondary-foreground opacity-60 text-xs font-medium px-4 pt-4 pb-2">
              Administrator
            </p>
          )}
          {renderMenuButton(
            <Users />,
            "User Management",
            "/user",
            role == "admin",
            page == "user"
          )}
        </Card>
        <ScrollArea className="bg-muted h-full">
          <div className="flex flex-col p-8 gap-4">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}

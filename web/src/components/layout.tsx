"use client";

import { ThemeChanger } from "@/components/theme-changer";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  NotebookPen,
  ScrollText,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  page: string;
}

export function Layout({ children, page }: LayoutProps) {
  const router = useRouter();
  const [role, setRole] = useState("guest");
  const [fullname, setFullname] = useState("");

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

  useEffect(() => {
    setFullname(Cookies.get("fullname") || "");
    setRole(Cookies.get("role") || "guest");
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <Card className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center px-8 py-4 gap-1 z-20">
        <img src="logo.svg" className="h-10 dark:hue-rotate-[330deg]" />
        <h1 className="text-secondary-foreground text-lg font-bold font-avenirnext mt-1 ml-[-4px]">
          commerce
        </h1>
        <p className="font-medium text-sm">{fullname}</p>
        <Button size="icon" variant="ghost">
          <Settings />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleLogout}>
          <LogOut />
        </Button>
        <ThemeChanger />
      </Card>
      <div className="grid grid-cols-[max-content_1fr] overflow-hidden">
        <Card className="py-2 z-10 flex flex-col">
          {(role == "admin" || role == "manager") && (
            <p className="text-secondary-foreground opacity-60 dark:opacity-90 text-xs font-medium px-4 pt-4 pb-2">
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
            <p className="text-secondary-foreground opacity-60 dark:opacity-90 text-xs font-medium px-4 pt-4 pb-2">
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
            <p className="text-secondary-foreground opacity-60 dark:opacity-90 text-xs font-medium px-4 pt-4 pb-2">
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

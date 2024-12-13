"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(0).max(50),
});

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<{
    refresh: string;
    access: string;
    role: string;
    fullname: string;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.error) {
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to login.",
        });
        setToken(null);
      } else {
        toast({
          title: "Success",
          description: "User successfully sign in.",
        });
        setToken(data);
      }
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to login.",
      });
      setToken(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      router.push("/shop");
      Cookies.set("access", token.access);
      Cookies.set("refresh", token.refresh);
      Cookies.set("username", form.getValues("username"));
      Cookies.set("fullname", token.fullname);
      Cookies.set("role", token.role);
    }
  }, [token]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-80"
      >
        <h1 className="text-center font-semibold text-lg">Sign In</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4 py-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log In
          </Button>
          <Button
            type="button"
            className="bg-secondary-foreground hover:bg-secondary-foreground hover:opacity-90"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}

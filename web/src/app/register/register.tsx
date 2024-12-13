"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function Register() {
  const [token, setToken] = useState<{
    refresh: string;
    access: string;
    role: string;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    username: z.string().min(0).max(50),
    password: z.string().min(0).max(50),
    confirm_password: z.string().min(0).max(50),
    first_name: z.string().min(0).max(50),
    last_name: z.string().min(0).max(50),
    email: z.string().min(0).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (values.confirm_password != values.password) {
        toast({
          title: "Unmatched password",
          variant: "destructive",
          description: "Please check confirm password.",
        });
      } else {
        const response = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.error) {
          toast({
            title: "Fail",
            variant: "destructive",
            description: "Failed to register User.",
          });
          setToken(null);
        } else {
          toast({
            title: "Success",
            description: "User successfully registered.",
          });
          setToken(data);
        }
      }
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to register User.",
      });
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      router.push("/shop");
      Cookies.set("access", token.access);
      Cookies.set("refresh", token.refresh);
      Cookies.set("username", form.getValues("username"));
      Cookies.set(
        "fullname",
        form.getValues("first_name") + " " + form.getValues("last_name")
      );
      Cookies.set("role", token.role);
    }
  }, [token]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-80"
      >
        <h1 className="text-center font-semibold text-lg">Register</h1>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4 py-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-secondary-foreground hover:bg-secondary-foreground hover:opacity-90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
          <Button type="button" onClick={() => router.push("/")}>
            Log In
          </Button>
        </div>
      </form>
    </Form>
  );
}

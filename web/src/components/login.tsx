"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<{
    refresh: string;
    access: string;
    role: string;
    fullname: string;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function loginUser() {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
      Cookies.set("username", username);
      Cookies.set("fullname", token.fullname);
      Cookies.set("role", token.role);
    }
  }, [token]);

  return (
    <>
      <h1 className="font-semibold text-2xl text-secondary-foreground">
        Log In
      </h1>
      <p className="w-80">Username</p>
      <Input
        className="w-80"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <p className="w-80">Password</p>
      <Input
        className="w-80"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="w-80 my-2 grid grid-cols-2 gap-4">
        <Button
          className="text-base"
          onClick={async () => {
            setIsLoading(true);
            await loginUser();
          }}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Log In
        </Button>
        <Button
          className="text-base bg-secondary-foreground hover:bg-secondary-foreground hover:opacity-90"
          onClick={() => {
            router.push("/register");
          }}
        >
          Register
        </Button>
      </div>
    </>
  );
}

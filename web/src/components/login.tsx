"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<{
    refresh: string;
    access: string;
  } | null>(null);
  const router = useRouter();

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
      if (data.error) {
        console.log("failed to login: ", data.error);
        setToken(null);
      } else {
        setToken(data);
      }
    } catch (error) {
      console.log("failed to login: ", error);
      setToken(null);
    }
  }

  useEffect(() => {
    if (token) {
      router.push("/shop");
      Cookies.set("access", token.access);
      Cookies.set("refresh", token.refresh);
      Cookies.set("username", username);
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
            await loginUser();
          }}
        >
          Log In
        </Button>
        <Button className="text-base bg-secondary-foreground hover:bg-secondary-foreground hover:opacity-90">
          Register
        </Button>
      </div>
    </>
  );
}

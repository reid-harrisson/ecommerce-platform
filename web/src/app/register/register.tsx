"use client";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<{
    refresh: string;
    access: string;
    role: string;
  } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function registerUser() {
    try {
      if (confirm != password) {
        toast({
          title: "Unmatched password",
          variant: "destructive",
          description: "Please check confirm password.",
        });
        return;
      }
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          first_name: firstname,
          last_name: lastname,
          email: email,
        }),
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
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to register User.",
      });
      setToken(null);
    }
  }

  useEffect(() => {
    if (token) {
      router.push("/shop");
      Cookies.set("access", token.access);
      Cookies.set("refresh", token.refresh);
      Cookies.set("username", username);
      Cookies.set("fullname", firstname + " " + lastname);
      Cookies.set("role", token.role);
    }
  }, [token]);

  return (
    <>
      <h1 className="font-semibold text-2xl text-secondary-foreground">
        Register
      </h1>
      <p className="w-80">First Name</p>
      <Input
        className="w-80"
        onChange={(event) => {
          setFirstname(event.target.value);
        }}
      />{" "}
      <p className="w-80">Last Name</p>
      <Input
        className="w-80"
        onChange={(event) => {
          setLastname(event.target.value);
        }}
      />
      <p className="w-80">Email</p>
      <Input
        className="w-80"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
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
      <p className="w-80">Confirm Password</p>
      <Input
        className="w-80"
        type="password"
        onChange={(event) => {
          setConfirm(event.target.value);
        }}
      />
      <div className="w-80 my-2 grid grid-cols-2 gap-4">
        <Button
          className="text-base bg-secondary-foreground hover:bg-secondary-foreground hover:opacity-90"
          onClick={async () => {
            await registerUser();
          }}
        >
          Register
        </Button>
        <Button
          className="text-base"
          onClick={() => {
            router.push("/");
          }}
        >
          Log In
        </Button>
      </div>
    </>
  );
}

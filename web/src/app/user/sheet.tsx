import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "manager" | "admin";
}

export function UserSheet({
  user,
  updateUser,
}: {
  user: User;
  updateUser: () => void;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    role: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          username: user.username,
        }),
      });
      const data = await response.json();
      if (data.user) {
        toast({
          title: "Success",
          description: "User successfully updated.",
        });
        updateUser();
      } else
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to update User.",
        });
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to update User.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            form.setValue("first_name", user.first_name);
            form.setValue("last_name", user.last_name);
            form.setValue("email", user.email);
            form.setValue("role", user.role);
          }}
        >
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription className="py-2">
            {"Make changes to the uses here. Click save when you're done."}
          </SheetDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-80"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Last Name:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Input {...field} className="text-left" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                          <DropdownMenuItem
                            onClick={() => form.setValue("role", "user")}
                          >
                            user
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => form.setValue("role", "manager")}
                          >
                            mangaer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => form.setValue("role", "admin")}
                          >
                            admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="my-2">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

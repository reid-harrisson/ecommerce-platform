import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

export function CreateSheet({ refresh }: { refresh: () => void }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    image_url: z.string(),
    price: z.string(),
    quantity: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      price: "0",
      quantity: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: parseFloat(values.price || "0.0"),
          quantity: parseInt(values.quantity || "0"),
        }),
      });
      const data = await response.json();
      if (response.ok && data) {
        toast({
          title: "Success",
          description: "Product successfully updated.",
        });
        refresh();
      } else
        toast({
          title: "Fail",
          variant: "destructive",
          description: "Failed to update Product.",
        });
    } catch {
      toast({
        title: "Fail",
        variant: "destructive",
        description: "Failed to update Product.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create Product</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Product</SheetTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-80"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*([.,][0-9]+)?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="my-2">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

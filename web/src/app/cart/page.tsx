import Cart from "./cart";
import { Layout } from "@/components/layout";

export default async function CartPage() {
  return (
    <Layout page="cart">
      <h2 className="font-medium text-lg text-secondary-foreground">
        Shopping Cart
      </h2>
      <Cart />
    </Layout>
  );
}

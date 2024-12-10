import Order from "./order";
import { Layout } from "@/components/layout";

export default async function CartPage() {
  return (
    <Layout>
      <h2 className="font-medium text-lg text-secondary-foreground">
        Order Management
      </h2>
      <Order />
    </Layout>
  );
}

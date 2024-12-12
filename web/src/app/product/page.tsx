import Product from "./product";
import { Layout } from "@/components/layout";

export default async function ProductPage() {
  return (
    <Layout page="product">
      <h2 className="font-medium text-lg text-secondary-foreground">
        Product Management
      </h2>
      <Product />
    </Layout>
  );
}

import Product from "./product";
import { Layout } from "@/components/layout";

export default async function ProductPage() {
  return (
    <Layout page="product">
      <Product />
    </Layout>
  );
}

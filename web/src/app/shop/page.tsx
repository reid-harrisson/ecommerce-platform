import { Layout } from "@/components/layout";
import Shop from "./shop";

export default async function ShopPage() {
  return (
    <Layout>
      <h2 className="font-medium text-lg text-secondary-foreground">
        Products
      </h2>
      <Shop />
    </Layout>
  );
}

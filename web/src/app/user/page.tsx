import { Layout } from "@/components/layout";
import User from "./user";

export default async function UserPage() {
  return (
    <Layout page="user">
      <h2 className="font-medium text-lg text-secondary-foreground">
        Products
      </h2>
      <User />
    </Layout>
  );
}

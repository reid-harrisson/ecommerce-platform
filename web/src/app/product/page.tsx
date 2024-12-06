import ProductList from "./product-list";

export default async function Product() {
  const products = await getProducts();

  return (
    <div className="p-4">
      <h1 className="text-lg font-medium">Hello World!</h1>
      <ProductList products={products} />
    </div>
  );
}

async function getProducts() {
  // Replace this URL with your actual API endpoint
  const response = await fetch("http://localhost:8000/product/");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return data.products;
}

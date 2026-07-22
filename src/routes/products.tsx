import { createFileRoute } from "@tanstack/react-router";
import { VerticalRoutePage } from "@/components/vertical-route-page";
import { pageSummaries } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | TattvaTech" },
      { name: "description", content: pageSummaries.products.description },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return <VerticalRoutePage {...pageSummaries.products} />;
}

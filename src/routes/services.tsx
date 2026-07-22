import { createFileRoute } from "@tanstack/react-router";
import { VerticalRoutePage } from "@/components/vertical-route-page";
import { pageSummaries } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | TattvaTech" },
      { name: "description", content: pageSummaries.services.description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return <VerticalRoutePage {...pageSummaries.services} />;
}

import { createFileRoute } from "@tanstack/react-router";
import { VerticalRoutePage } from "@/components/vertical-route-page";
import { pageSummaries } from "@/lib/site";

export const Route = createFileRoute("/drones")({
  head: () => ({
    meta: [
      { title: "Drones | TattvaTech" },
      { name: "description", content: pageSummaries.drones.description },
    ],
  }),
  component: DronesPage,
});

function DronesPage() {
  return <VerticalRoutePage {...pageSummaries.drones} />;
}

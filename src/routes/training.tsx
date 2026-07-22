import { createFileRoute } from "@tanstack/react-router";
import { VerticalRoutePage } from "@/components/vertical-route-page";
import { pageSummaries } from "@/lib/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training | TattvaTech" },
      { name: "description", content: pageSummaries.training.description },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return <VerticalRoutePage {...pageSummaries.training} />;
}

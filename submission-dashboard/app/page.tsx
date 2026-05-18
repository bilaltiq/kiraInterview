import SubmissionsTable from "../components/SubmissionsTable";
import submissions from "@/data/submissions.json";
import type { Submission } from "@/types/submission";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <SubmissionsTable submissions={submissions as Submission[]} />
      </div>
    </main>
  );
}

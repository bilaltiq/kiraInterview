"use client";

import { useMemo, useState } from "react";
import type { Submission } from "@/types/submission";

type SubmissionsTableProps = {
  submissions: Submission[];
};

type SearchField = keyof Submission | "all";

export default function SubmissionsTable({
  submissions,
}: SubmissionsTableProps) {
  /**
   * React state annotation:
   * `searchTerm` stores the user's current text input.
   */
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * React state annotation:
   * `searchField` stores which submission field the user wants to search.
   * It can be one specific field, or "all".
   */
  const [searchField, setSearchField] = useState<SearchField>("all");

  const filteredSubmissions = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return submissions.slice(0, 10);
    }

    const results = submissions.filter((submission) => {
      const searchableValues: Record<keyof Submission, string> = {
        studentId: submission.studentId,
        assignmentId: submission.assignmentId,
        problemId: submission.problemId,
        score: submission.score.toString(),
        timestamp: submission.timestamp,
      };

      if (searchField === "all") {
        return Object.values(searchableValues).some((value) =>
          value.toLowerCase().includes(normalizedSearchTerm),
        );
      }

      return searchableValues[searchField]
        .toLowerCase()
        .includes(normalizedSearchTerm);
    });

    return results.slice(0, 10);
  }, [submissions, searchTerm, searchField]);

  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Submission Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Search submissions by student ID, assignment ID, problem ID, score, or
          timestamp.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search submissions..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
        />

        <select
          value={searchField}
          onChange={(event) =>
            setSearchField(event.target.value as SearchField)
          }
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
        >
          <option value="all">All fields</option>
          <option value="studentId">Student ID</option>
          <option value="assignmentId">Assignment ID</option>
          <option value="problemId">Problem ID</option>
          <option value="score">Score</option>
          <option value="timestamp">Timestamp</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Assignment ID</th>
              <th className="px-4 py-3">Problem ID</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredSubmissions.map((submission, index) => (
              <tr
                key={`${submission.studentId}-${submission.assignmentId}-${submission.problemId}-${index}`}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {submission.studentId}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {submission.assignmentId}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {submission.problemId}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {submission.score.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(submission.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubmissions.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">
            No matching submissions found.
          </div>
        )}
      </div>
    </section>
  );
}

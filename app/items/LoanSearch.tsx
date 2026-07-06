"use client";

import { useState } from "react";
import { formatDate } from "../../lib/format";

type Loan = {
  loan_id: number;
  member_id: number;
  book_title: string;
  borrowed_on: string;
  due_on: string;
  full_name: string;
  email: string;
};

export default function LoanSearch({ loans }: { loans: Loan[] }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Loan[]>(loans);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(loanId: number) {
    setDeletingId(loanId);
    try {
      const res = await fetch(`http://127.0.0.1:3000/items/${loanId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Delete failed with status ${res.status}`);
      }
      setItems((prev) => prev.filter((loan) => loan.loan_id !== loanId));
    } catch (err) {
      console.error(err);
      alert("Could not delete the loan. Is the API running?");
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = items.filter((loan) => {
    const q = query.toLowerCase();
    return (
      loan.book_title.toLowerCase().includes(q) ||
      loan.full_name.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {items.length === 0 ? (
        <div className="border border-zinc-800 border-dashed rounded-lg p-10 text-center">
          <p className="text-zinc-300 font-medium">No items yet</p>
          <p className="text-sm text-zinc-600 mt-1">
            Add a loan above to get started.
          </p>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by book or borrower..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors mb-4"
          />
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
            {filtered.length} {filtered.length === 1 ? "loan" : "loans"}
          </p>
          <ul className="space-y-2">
            {filtered.length === 0 ? (
              <li className="border border-zinc-800 border-dashed rounded-lg p-8 text-center text-sm text-zinc-600">
                No loans match "{query}"
              </li>
            ) : (
              filtered.map((loan) => (
                <li
                  key={loan.loan_id}
                  className="group border border-zinc-800 rounded-lg p-4 hover:border-emerald-400/50 hover:bg-zinc-900/50 transition-all"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium text-zinc-100 group-hover:text-emerald-400 transition-colors">
                      {loan.book_title}
                    </p>
                    <div className="flex items-baseline gap-3 shrink-0">
                      <span className="text-xs text-zinc-600 font-mono">
                        #{loan.loan_id}
                      </span>
                      <button
                        onClick={() => handleDelete(loan.loan_id)}
                        disabled={deletingId === loan.loan_id}
                        className="text-xs text-zinc-600 hover:text-red-400 border border-zinc-800 hover:border-red-400/50 rounded px-2 py-1 transition-colors disabled:opacity-50"
                      >
                        {deletingId === loan.loan_id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">
                    {loan.full_name} · due{" "}
                    <span
                      className={
                        new Date(loan.due_on) < new Date()
                          ? "text-red-400"
                          : "text-zinc-500"
                      }
                    >
                      {formatDate(loan.due_on)}
                    </span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}
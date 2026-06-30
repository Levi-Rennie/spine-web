"use client";

import { useState } from "react";

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

  const filtered = loans.filter((loan) => {
    const q = query.toLowerCase();
    return (
      loan.book_title.toLowerCase().includes(q) ||
      loan.full_name.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by book or borrower..."
        className="w-full border rounded p-2 mb-4"
      />
      <p className="text-sm text-zinc-500 mb-2">{filtered.length} loans</p>
      <ul className="space-y-2">
        {filtered.map((loan) => (
          <li key={loan.loan_id} className="border rounded p-3">
            <p className="font-medium">{loan.book_title}</p>
            <p className="text-sm text-zinc-500">
              {loan.full_name} · due {loan.due_on}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
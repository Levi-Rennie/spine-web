"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLoanSchema } from "../../lib/schemas";

const inputClass =
  "bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors [color-scheme:dark]";

export default function AddItemForm() {
  const [memberId, setMemberId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [borrowedOn, setBorrowedOn] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    const candidate = {
      member_id: Number(memberId),
      book_title: bookTitle,
      borrowed_on: borrowedOn,
      due_on: dueOn,
    };

    const parsed = createLoanSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
      return;
    }
    setErrors([]);
    setSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:3000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json();
        if (Array.isArray(body.message)) {
          setErrors(
            body.message.map(
              (i: { path: string[]; message: string }) =>
                `${i.path.join(".")}: ${i.message}`
            )
          );
        } else {
          setErrors([body.message ?? "Something went wrong"]);
        }
        return;
      }

      setMemberId("");
      setBookTitle("");
      setBorrowedOn("");
      setDueOn("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mb-10 bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4">
        Add loan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Member ID"
          type="number"
          className={inputClass}
        />
        <input
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Book title"
          className={inputClass}
        />
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          Borrowed on
          <input
            value={borrowedOn}
            onChange={(e) => setBorrowedOn(e.target.value)}
            type="date"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-zinc-500">
          Due on
          <input
            value={dueOn}
            onChange={(e) => setDueOn(e.target.value)}
            type="date"
            className={inputClass}
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-4 bg-emerald-400 text-zinc-950 font-medium text-sm px-5 py-2 rounded-md hover:bg-emerald-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Adding…" : "Add loan"}
      </button>
      {errors.length > 0 && (
        <ul className="mt-4 space-y-1">
          {errors.map((err) => (
            <li key={err} className="text-sm text-red-400 flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✕</span>
              {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
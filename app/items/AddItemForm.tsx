'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLoanSchema } from '../../lib/schemas';

export default function AddItemForm() {
  const [memberId, setMemberId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowedOn, setBorrowedOn] = useState('');
  const [dueOn, setDueOn] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
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
      setErrors(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`));
      return;
    }
    setErrors([]);

    const res = await fetch('http://127.0.0.1:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

if (!res.ok) {
      const body = await res.json();
      if (Array.isArray(body.message)) {
        setErrors(body.message.map((i: { path: string[]; message: string }) =>
          `${i.path.join('.')}: ${i.message}`
        ));
      } else {
        setErrors([body.message ?? 'Something went wrong']);
      }
      return;
    }

    setMemberId('');
    setBookTitle('');
    setBorrowedOn('');
    setDueOn('');
    router.refresh();
  }

  return (
    <div>
      <input
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        placeholder="Member ID"
        type="number"
      />
      <input
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Book title"
      />
      <input
        value={borrowedOn}
        onChange={(e) => setBorrowedOn(e.target.value)}
        type="date"
      />
      <input
        value={dueOn}
        onChange={(e) => setDueOn(e.target.value)}
        type="date"
      />
      <button onClick={handleSubmit}>Add loan</button>
      {errors.length > 0 && (
        <ul>
          {errors.map((err) => (
            <li key={err} style={{ color: 'red' }}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
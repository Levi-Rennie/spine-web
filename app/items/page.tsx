type Loan = {
  loan_id: number;
  member_id: number;
  book_title: string;
  borrowed_on: string;
  due_on: string;
  full_name: string;
  email: string;
};

async function getItems(): Promise<Loan[]> {
  const t0 = Date.now();
  console.log("[getItems] calling fetch...");
  const res = await fetch("http://127.0.0.1:3000/items", { cache: "no-store" });
  console.log("[getItems] fetch resolved in", Date.now() - t0, "ms");
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export default async function ItemsPage() {
  const items = await getItems();
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Loans</h1>
      <ul className="space-y-2">
        {items.map((loan) => (
          <li key={loan.loan_id} className="border rounded p-3">
            <p className="font-medium">{loan.book_title}</p>
            <p className="text-sm text-zinc-500">{loan.full_name} · due {loan.due_on}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
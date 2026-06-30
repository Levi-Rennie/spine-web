import LoanSearch from "./LoanSearch";

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
      <LoanSearch loans={items} />
    </main>
  );
}
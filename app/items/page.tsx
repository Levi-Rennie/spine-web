import LoanSearch from "./LoanSearch";
import AddItemForm from "./AddItemForm";

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
  const res = await fetch("http://127.0.0.1:3000/items", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export default async function ItemsPage() {
  const items = await getItems();
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Spine<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Library loans</p>
        </header>
        <AddItemForm />
        <LoanSearch loans={items} />
      </div>
    </main>
  );
}
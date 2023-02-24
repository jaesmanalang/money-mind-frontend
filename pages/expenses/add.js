import RootLayout from '@/components/RootLayout';
import ExpenseForm from '@/components/ExpenseForm';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AddExpense() {
  const router = useRouter();
  return (
    <RootLayout>
      <div className="mx-auto p-4 max-w-xl">
        <button
          onClick={() => router.back()}
          className="gap-2 mb-5 flex items-center p-0 link-neutral"
          href="/"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-4xl font-extrabold">Add Expense</h1>
        <div className="mt-6">
          <ExpenseForm />
        </div>
      </div>
    </RootLayout>
  );
}

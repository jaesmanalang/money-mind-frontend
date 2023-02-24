import useAuth from '@/hooks/useAuth';
import SplashScreen from '@/components/SplashScreen';
import RootLayout from '@/components/RootLayout';
import ExpenseList from '@/components/ExpenseList';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { state } = useAuth();

  if (!state.user) {
    return <SplashScreen />;
  }

  return (
    <RootLayout>
      <main>
        <div className="mx-auto p-4 max-w-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold">Expenses</h1>
            <Link className="btn btn-base-200" href="/expenses/add">
              <PlusIcon className="w-4 h-4" />
              <span className="ml-2">Add Expense</span>
            </Link>
          </div>
          <div className="mt-6">
            <ExpenseList />
          </div>
        </div>
      </main>
    </RootLayout>
  );
}

import { useState, useEffect } from 'react';
import { axiosPrivate } from '@/helpers/axios';
import ExpenseItem from './ExpenseItem';
import Card from './Card';

export default function ExpenseList({}) {
  const [expenses, setExpenses] = useState([]);
  const totalAmount =
    expenses.length > 0
      ? expenses.reduce((total, expense) => total + expense.amount, 0)
      : 0;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const fetchExpenses = async () => {
        try {
          const response = await axiosPrivate.get('/expenses');
          console.log(response.data);
          setExpenses(response.data.expenses);
        } catch (error) {
          console.log(error.response?.data);
        }
      };

      fetchExpenses();
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (expenses.length === 0) {
    return (
      <Card>
        <div className="h-[10rem] flex items-center justify-center">
          No expenses yet...
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
      <hr />
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-lg">Total Expenses:</div>
        <div>₱ {totalAmount}</div>
      </div>
    </div>
  );
}

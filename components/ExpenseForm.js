import { useState } from 'react';
import { axiosPrivate } from '@/helpers/axios';
import { useRouter } from 'next/router';

export default function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosPrivate.post('/expenses', {
        description,
        amount,
      });

      setDescription('');
      setAmount('');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-md gap-2">
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Groceries..."
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="0.00"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mt-4">
          <button className="btn w-full" type="submit">
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
}

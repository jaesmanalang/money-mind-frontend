import Card from './Card';

export default function ExpenseItem({
  expense: { description, amount, category },
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-sm">{description}</div>
        <div>₱ {amount}</div>
      </div>
    </Card>
  );
}

export default function TransactionsTable({ data = [] }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <div className="font-semibold mb-3">Recent Transactions</div>

      {data.length === 0 ? (
        <div className="text-gray-400 text-center py-6">
          No transactions yet
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Category</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.title}</td>
                <td>{r.category}</td>
                <td className="text-right">₹{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
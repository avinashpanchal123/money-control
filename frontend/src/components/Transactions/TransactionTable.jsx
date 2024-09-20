import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { memo } from 'react';

const TransactionTable =({ transactions, handleEdit, handleDelete }) => {
 
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          {/* <th className="py-2 px-4 border-b text-left">Account</th> */}
          <th className="py-2 px-4 border-b text-left">Category</th>
          <th className="py-2 px-4 border-b text-left">Description</th>
          <th className="py-2 px-4 border-b text-right">Amount</th>
          <th className="py-2 px-4 border-b text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="bg-gray-100">
            {/* <td className="py-2 px-4 border-b">{transaction.account || "avinash"}</td> */}
            <td className="py-2 px-4 border-b">{transaction.category.category_name || "avinash"}</td>
            <td className="py-2 px-4 border-b">{transaction.description}</td>
            <td className="py-2 px-4 border-b text-right">
              {transaction.amount} ({!!transaction.transactionType.income ? "income" : "expense"})
            </td>
            <td className="py-2 px-4 border-b text-right">
              <div className="flex justify-end space-x-4">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEdit(transaction.id)}
                />
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(transaction.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default memo(TransactionTable);

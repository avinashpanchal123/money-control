import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, editTransaction } from "../../features/transaction/transactionSlice";



const Transactions = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false);
  const transactions = useSelector(state => state.transaction.value)

  const [transactionType, setTransactionType] = useState({
    income: false,
    expense: false
  });
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transaction, setTransaction] = useState({});
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    console.log(transactions);
  }, [transactions])


  const addNewTransaction = () => {

    if (!!transactionAmount && (transactionType.income || transactionType.expense)) {
      let newTransaction = {
        id: Date.now(),
        amount: transactionAmount,
        type: transactionType.income ? "income" : "expense",
      }
      console.log(newTransaction);

      dispatch(addTransaction(newTransaction))
    }
  };

  const handleSave = (e) => {
    e.preventDefault()
    if (!!editID)
      saveEdited(editID)
    else
      addNewTransaction()
    clearValues();
  }

  const saveEdited = (id) => {
    let tran = {
      id: id,
      amount: transactionAmount,
      type: transactionType.income ? "income" : "expense",
    };
    dispatch(editTransaction(tran));
  }


  const handleType = (event) => {
    const { name } = event.target;
    if (name == 'income') {
      setTransactionType({
        income: true,
        expense: false
      })
    }
    else {
      setTransactionType({
        income: false,
        expense: true
      })
    }
  }

  const handleEdit = (id) => {

    setEditID(id)
    let currTransaction = transactions.find((transaction) => id === transaction.id);
    console.log(currTransaction);
    setTransactionAmount(currTransaction.amount);
    setTransactionType({
      income: currTransaction.type == "income" ? true : false,
      expense: currTransaction.type == "expense" ? true : false
    })
    setShowModal(true);
  };


  const clearValues = () => {
    setTransactionAmount('');
    setTransactionType({
      income: false,
      expense: false
    })
    setShowModal(false)
  }

  return <>
    {/* Outer container with dark grey background */}
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      {/* Inner container with white background */}
      <div className="bg-white w-96 p-6 rounded-md shadow-lg">
        {/* Transaction List */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-center mb-4">Transactions</h1>
          <ul>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
                >
                  <span className="font-semibold">
                    {transaction.amount} ({transaction.type})
                  </span>
                  <div className="flex space-x-4">
                    <FaEdit
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleEdit(transaction.id)}
                    />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(transaction.id)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No Transactions  added yet.</p>
            )}
          </ul>
        </div>

        {/* Add New Transaction Button at the Bottom */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            + Add New Transaction
          </button>
        </div>
      </div>
    </div>
    {
      showModal &&
      // <Modal
      //     showModal={showModal}
      //     headingText="Transaction"
      //     setValue={setTransactionAmount}
      //     addValue={addNewTransaction}
      //     clearValues={clearValues}
      //     handleType={handleType}
      //     type={transactionType}
      //     name={transactionAmount}
      // />
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        {/* Modal Container */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-0">

            {/* Modal Box */}
            <div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full">
              {/* Modal Content */}
              <div className="p-6">
                {/* Modal Heading */}
                <h1 className="text-xl font-bold text-gray-800 mb-4">Add New Transaction</h1>

                {/* Form */}
                <form onSubmit={handleSave}>
                  {/* Checkbox for Income/Expense */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <input
                        onChange={handleType}
                        checked={transactionType.income}
                        type="checkbox"
                        name="income"
                        id="income"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="income" className="ml-2 text-gray-700">Income</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={handleType}
                        checked={transactionType.expense}
                        type="checkbox"
                        name="expense"
                        id="expense"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="expense" className="ml-2 text-gray-700">Expense</label>
                    </div>
                  </div>

                  {/* Input for Transaction Amount */}
                  <div className="mb-6">
                    <input
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      type="number"
                      placeholder="Transaction Amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={clearValues}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </>
}

export default Transactions;
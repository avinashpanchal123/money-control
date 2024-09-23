import { useState, useMemo, useEffect, useCallback } from "react";
import Modal from "../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setTransactions, addTransaction, editTransaction, deleteTransaction } from "../../features/transaction/transactionSlice";
import TransactionTable from './TransactionTable'
import { editCategory, addCategory, deleteCategory, setCategories } from "../../features/category/categorySlice";
import TransactionFilter from './TransactionFilter';
import { useLocation, useNavigate } from 'react-router-dom';


const Transactions = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const transactions = useSelector(state => state.transaction.value);
  const categories = useSelector(state => state.category.value);
  const [filterCategoryID, setFilterCategoryID] = useState('')

  const [transactinoform, setTransactionForm] = useState(
    {
      categoryID: '',
      amount: '',
      transactionType: {
        income: false,
        expense: false
      },
      description: ''
    }
  )
  const [editID, setEditID] = useState(null);
  console.log(backendBaseUrl);
  
  useEffect(() => {
    const fetchCategories = async () => {
      // let response = axios.get('http://localhost:3000/category', {
      //   withCredentials: true // Ensure cookies are sent with the request
      // });

      let response = axios.get(`${backendBaseUrl}/category`, {
        //let response = axios.get('http://localhost:3000/category
        withCredentials: true // Ensure cookies are sent with the request
      });
      response.then((params) => {
        let data = params.data.map((el) => {
          let obj = {
            id: el.id,
            name: el.category_name,
            type: el.category_type
          }
          return obj;
        });

        dispatch(setCategories(data))
      }).catch((err) => {
        console.error('Error fetching categories:', err);
        navigate('/login')
      })
    }

    const fetchTransactions = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/transactions', {
        //   withCredentials: true // Ensure cookies are sent with the request
        // });

        const response = await axios.get(`${backendBaseUrl}/transactions`, {
          withCredentials: true // Ensure cookies are sent with the request
        });
        const data = response.data.data;

        dispatch(setTransactions(data))
      } catch (err) {
        console.error('Error fetching transactions:', err);
        navigate('/login')
      }

    }

    const fetchAllData = async () => {
      try {
        await Promise.all([fetchCategories(), fetchTransactions()])
      } catch (err) {
        console.error(err);
        navigate('/login')
      }
    }
    fetchAllData()
  }, [])


  const addNewTransaction = async () => {
    try {
    
      if (!!transactinoform.amount && (transactinoform.transactionType.income || transactinoform.transactionType.expense)) {
        // let response = await axios.post('http://localhost:3000/transactions/add', transactinoform, {
        //   withCredentials: true // Ensure cookies are sent with the request
        // });

        let response = await axios.post(`${backendBaseUrl}/transactions/add`, transactinoform, {
          withCredentials: true // Ensure cookies are sent with the request
        });
        let data = response.data.data;
        console.log(data);
        
        data = {...data,
           transactionType : {
            income : data.transactionType == "income" ? true : false,
            expense : data.transactionType == "expense" ? true : false
           }
        }
        console.log(data, 'after');
        dispatch(addTransaction(data))
      }
    } catch (err) {
      console.error(err);

    }
  };

  const handleChange = (e)=>{
    const {name, type, value, checked} = e.target;
  
    if(type == 'checkbox'){
      setTransactionForm((prevForm) => ({
        ...prevForm,
        transactionType: {
          income : name == "income" ? true : false,
          expense : name == "expense" ? true : false
        }
      }));
    }
    else {

      setTransactionForm((prevForm) => ({
        ...prevForm,
        [name]: type === 'number' ? value : value
      }));
    }
  }

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
      amount : transactinoform.amount,
      type : !!transactinoform.transactionType.income ? "income" : "expense",
      description : transactinoform.description
    }
    dispatch(editTransaction(tran));
  }



  const handleEdit = useCallback((id) => {

    setEditID(id)
    let currTransaction = transactions.find((transaction) => id === transaction.id);
    setTransactionForm({
      categoryID: currTransaction.id,
      amount: currTransaction.amount,
      categoryType: {
        income: currTransaction.type == "income" ? true : false,
        expense: currTransaction.type == "expense" ? true : false
      },
      description: currTransaction.description
    })
    setShowModal(true);
  }, [])


  const clearValues = () => {
    setTransactionForm({
      categoryID: '',
      amount: '',
      transactionType: {
        income: false,
        expense: false
      },
      description: ''
    })
    setShowModal(false)
  }

  const handleDelete = useCallback(async (id) => {
    // await axios.post('http://localhost:3000/transactions/delete', { id }, {
    //   withCredentials: true // Ensure cookies are sent with the request
    // })

    await axios.post(`${backendBaseUrl}/transactions/delete`, { id }, {
      withCredentials: true // Ensure cookies are sent with the request
    })
    dispatch(deleteTransaction(id))
  }, [transactions])

  const onFilter = () => {

  }

  const filteredTransactions = useMemo(() => {

    if (!!filterCategoryID)
      return transactions.filter((tran) => tran.category.id == filterCategoryID)
    return transactions
  }, [filterCategoryID, transactions])


  return <>
    {/* Outer container with dark grey background */}
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 w-full md:w-auto"
        >
          + Add New Transaction
        </button>
      </div>
      {/* Inner container with white background */}
      <div className="bg-white w-full md:w-8/12 p-6 rounded-md shadow-lg">
        {/* Transaction List */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-center mb-4">Transactions</h1>
          <div className="w-2/4 mt-10">
            <TransactionFilter
              categories={categories}
              filterCategoryID={filterCategoryID}
              setFilterCategoryID={setFilterCategoryID}
              onFilter={onFilter}
            />
          </div>
          <ul>
            {transactions.length > 0 ? (
              <TransactionTable transactions={filteredTransactions}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ) : (
              <p className="text-center text-gray-500">No Transactions  added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
    {
      showModal &&
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
                        onChange={handleChange}
                        checked={transactinoform.transactionType.income}
                        type="checkbox"
                        name="income"
                        id="income"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="income" className="ml-2 text-gray-700">Income</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={handleChange}
                        checked={transactinoform.transactionType.expense}
                        type="checkbox"
                        name="expense"
                        id="expense"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="expense" className="ml-2 text-gray-700">Expense</label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <select
                      onChange={handleChange}
                      name="categoryID"
                      className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option>Select Option...</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>


                  {/* Input for Transaction Amount */}
                  <div className="mb-6">
                    <input
                      value={transactinoform.amount}
                      onChange={handleChange}
                      type="text"
                      name="amount"
                      placeholder="Transaction Amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  {/* Description for transaction*/}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      onChange={handleChange} 
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter a brief description of the transaction..."
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
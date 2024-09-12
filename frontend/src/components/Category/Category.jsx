import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";


const Category = () => {
    const [categoryType, setcategoryType] = useState({
        income: false,
        expense: false
    });
    const [categoryName, setCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState({
        income: [],
        expense: []
    })
    useEffect(()=>{
        console.log(category);
        
        // setCategory()
    }, [category])


    const addCategory = (e) => {
        e.preventDefault();

        if (!!categoryName && !!categoryType) {
            const newCategory = { ...category };

            const categoryData = { categoryName, categoryType };

            if (categoryType.income) {
                newCategory.income = [...newCategory.income, categoryData];
            } else {
                newCategory.expense = [...newCategory.expense, categoryData];
            }

            setCategory(newCategory);
        }
        
        clearValues();
    };


    const handleType = (event) => {
        const { name } = event.target;
        if (name == 'income') {
            setcategoryType({
                income: true,
                expense: false
            })
        }
        else {
            setcategoryType({
                income: false,
                expense: true
            })
        }
    }

    const clearValues = () => {
        setCategoryName('');
        setcategoryType({
            income: false,
            expense: false
        })
        setShowModal(false)
    }

    return <>
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Add Category
            </button>
        </div>
        {
            showModal &&
           
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className='flex items-center md:container md:mx-auto'>
                                <form action="">
                                    <h1 className="m-4 text-xl font-bold">Add New Category</h1>
                                    <input onChange={handleType} checked={categoryType.income} type="checkbox" name="income" id="income" />
                                    <label htmlFor="income">Income</label>
                                    <input onChange={handleType} checked={categoryType.expense} type="checkbox" name="expense" id="expense" />
                                    <label htmlFor="expense">Expense</label>
                                    <div>
                                        <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder="category name" />
                                    </div>

                                    <div className="flex-auto flex space-x-4 mt-8">
                                        <button onClick={clearValues}
                                            className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                            Cancel
                                        </button>
                                        <button onClick={addCategory}
                                            className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
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

export default Category;
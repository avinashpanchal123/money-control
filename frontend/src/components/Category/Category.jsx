import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


const Category = () => {
    const [categoryType, setcategoryType] = useState({
        income: false,
        expense: false
    });
    const [categoryName, setCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editID, setEditID] = useState(null)
 
    useEffect(() => {
        console.log(categories);
    }, [categories])


    const addCategory = () => {

        if (categoryName && (categoryType.income || categoryType.expense)) {
            const newCategory = {
                id: Date.now(),
                name: categoryName,
                type: categoryType.income ? "income" : "expense",
            };

            setCategories((prevCategories) => [...prevCategories, newCategory]);
        }
        
    };

    const handleSave = (e)=>{
        e.preventDefault()
        if(!!editID)
            saveEdited(editID)
        else
          addCategory()
        clearValues();
    }


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

    const handleEdit = (id) => {
       setEditID(id)
        let currCategory = categories.find((category)=> id === category.id);
        setCategoryName(currCategory.name);
        setcategoryType({
            income: currCategory.type == "income" ? true : false,
            expense: currCategory.type == "expense" ? true : false
        })
        setShowModal(true);
    };

    const saveEdited = (id)=>{
        const modifiedCategory = {
            id: Date.now(),
            name: categoryName,
            type: categoryType.income ? "income" : "expense",
        };
        let modifiedCategoryList = categories.map((category)=> id === category.id ? modifiedCategory: category);
        setCategories(modifiedCategoryList);
    }

    const handleDelete = (id) => {
        const updatedCategories = categories.filter((category) => category.id !== id);
        setCategories(updatedCategories);
    };

    return <>
        {/* Outer container with dark grey background */}
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            {/* Inner container with white background */}
            <div className="bg-white w-96 p-6 rounded-md shadow-lg">
                {/* Category List */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-center mb-4">Category List</h1>
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
                                >
                                    <span className="font-semibold">
                                        {category.name} ({category.type})
                                    </span>
                                    <div className="flex space-x-4">
                                        <FaEdit
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() => handleEdit(category.id)}
                                        />
                                        <FaTrashAlt
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(category.id)}
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No categories added yet.</p>
                        )}
                    </ul>
                </div>

                {/* Add New Category Button at the Bottom */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    >
                        + Add New Category
                    </button>
                </div>
            </div>
        </div>
        {
            showModal &&
            <Modal
                showModal={showModal}
                headingText="Category"
                setValue={setCategoryName}
                handleSave={handleSave}
                clearValues={clearValues}
                handleType={handleType}
                type={categoryType}
                value={categoryName}
                editID = {editID}
            />

        }



    </>
}

export default Category;
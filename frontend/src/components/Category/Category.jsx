import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { editCategory, addCategory, deleteCategory, setCategories } from "../../features/category/categorySlice";


const Category = () => {
    const categories = useSelector(state => state.category.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAddModal = location.pathname === '/category/add';
    const isEditModal = !!location.pathname.includes('/category/edit');

    const [categoryform, setCategoryform] = useState(
        {
            categoryName: '',
            categoryType: {
                income: false,
                expense: false
            },
        }
    )
    const [editID, setEditID] = useState(null)

    useEffect(() => {


        let response = axios.get('http://localhost:3000/category', {
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
            console.error('Error fetching categories:', err)
            navigate('/')
        })

    }, [])


    const addNewCategory = async () => {

        if (categoryform.categoryName && (categoryform.categoryType.income || categoryform.categoryType.expense)) {

            let response = axios.post('http://localhost:3000/category/add', categoryform, {
                withCredentials: true // Ensure cookies are sent with the request
            });
            let params = await response;
            let data = params.data;
            dispatch(addCategory(data));
        }
        else {
            // handle this in modal itself  
            alert("All Fields are mendatrory")
        }

    };

    const handleSave = (e) => {
        e.preventDefault()
        if (!!editID)
            saveEdited(editID)
        else
            addNewCategory()
        navigate('/category')
        clearValues();
    }



    const clearValues = () => {
        setCategoryform({
            categoryName: '',
            categoryType: {
                income: false,
                expense: false
            },
        })
        navigate('/category')
    }

    const handleEdit = (id) => {
        setEditID(id)
        let currCategory = categories.find((category) => id === category.id);
        console.log(currCategory);
        
        setCategoryform({
            categoryName: currCategory.name,
            categoryType: {
                income: currCategory.type == "income" ? true : false,
                expense: currCategory.type == "expense" ? true : false
            },
        })
        navigate(`category/edit/${id}`)
    };

    const saveEdited = async (id) => {
       
        const response = await axios.post(`http://localhost:3000/category/edit/`,{...categoryform, id: id},  {
            withCredentials: true // Ensure cookies are sent with the request
        });
        let params = await response;
        let data = params.data;

        dispatch(editCategory(data));
    }

    const handleDelete = async (id) => {
        // let category = categories.find((category)=> category.id == id);
        await axios.post('http://localhost:3000/category/delete', { id },  {
            withCredentials: true // Ensure cookies are sent with the request
        })
        dispatch(deleteCategory(id))
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
                        onClick={() => {
                            navigate('/category/add')
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    >
                        + Add New Category
                    </button>
                </div>
            </div>
        </div>
        {
            (isAddModal || isEditModal) &&
            <Modal
                showModal={(isAddModal || isEditModal)}
                headingText={`${!!isAddModal ? "Add New Category" : "Edit Category"}`}
                setCategoryform={setCategoryform}
                categoryform={categoryform}
                handleSave={handleSave}
                clearValues={clearValues}
                editID={editID}
            />

        }

    </>
}

export default Category;
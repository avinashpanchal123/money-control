const async = require('async');
const Category = require('./../db/models/category');


const getAllCategories = async (req, res) => {
    try {
        let categoryList = await Category.findAll({
            where: {
                user_id: 1
            }
        })
        
        res.status(200).json(categoryList)
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Error fetching categories' });
    }
}

const addCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type) {
            return res.status(400).json({ message: 'Name and type are required' });
        }

        const newCategory = await Category.create({ user_id: 1, category_name: name, category_type: type });
        res.status(201).json({
            id: newCategory.id,
            name : newCategory.category_name,
            type : newCategory.category_type
        });
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ message: 'Error adding category' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const {id, name, type } = req.body;  

        const [updated] = await Category.update(
            { category_name: name, category_type: type },  
            { where: { id } } 
        );

        if (updated) {
            const updatedCategory = await Category.findOne({ where: { id } });
            res.status(200).json({
                id: updatedCategory.id,
                name : updatedCategory.category_name,
                type : updatedCategory.category_type
            }); 
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ message: 'Error updating category' });
    }
};


const deleteCategory = async(req, res)=>{
    try{
        const {id} = req.body;

        const deleted = await Category.destroy({
            where: {
                id: id
            }
        })
        if (deleted) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    }catch(err){
        console.error('Error deleting category:', err);
        res.status(500).json({ message: 'Error deleting category' });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}
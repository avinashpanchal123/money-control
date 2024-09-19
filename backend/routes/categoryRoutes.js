const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/categoryController'); 

router.get('/', categoryController.getAllCategories); 
router.post('/add', categoryController.addCategory);
router.post('/edit', categoryController.updateCategory);
router.post('/delete', categoryController.deleteCategory)

module.exports = router;

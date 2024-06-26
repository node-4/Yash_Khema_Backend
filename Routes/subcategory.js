const express = require('express')
const router = express();
const subCategory = require('../Controller/subCegory');
router.post('/', subCategory.AddSubCategory);
router.get('/', subCategory.getAll);
router.delete('/:id', subCategory.DeleteSubCategory)
router.get('/getById/:Id', subCategory.getById);
router.put('/updateSubCategory/:id', subCategory.updateSubCategory);
module.exports = router; 
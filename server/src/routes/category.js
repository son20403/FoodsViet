import express from 'express'
const router = express.Router()
import categoryController from '../controllers/CategoryController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, categoryController.create)
router.post('/createCategory', middlewareAuth.verifyTokenAdmin, categoryController.createCategory)
router.get('/getAllCategories', categoryController.getAllCategories)
router.get('/getAllCategoriesAdmin', middlewareAuth.verifyTokenAdmin, categoryController.getAllCategoriesAdmin)
router.get('/detailBySlug?:slug', categoryController.detailBySlug)
router.get('/detail?:id', categoryController.detail)
// router.get('/detail', categoryController.detail)

module.exports = router;

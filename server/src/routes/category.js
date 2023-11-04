import express from 'express'
const router = express.Router()
import categoryController from '../controllers/CategoryController'
import middlewareAuth from '../middlewares/auth'
import uploadCloud from "../middlewares/uploader";


router.post('/create', middlewareAuth.verifyToken, categoryController.create)
router.post('/createCategory', uploadCloud.single("image"), middlewareAuth.verifyTokenAdmin, categoryController.createCategory)
router.get('/getAllCategories', categoryController.getAllCategories)
router.get('/getAllCategoriesAdmin', middlewareAuth.verifyTokenAdmin, categoryController.getAllCategoriesAdmin)
router.get('/detailBySlug?:slug', categoryController.detailBySlug)
router.get('/detail?:id', categoryController.detail)

module.exports = router;

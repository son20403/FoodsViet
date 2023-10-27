import express from 'express'
const router = express.Router()
import categoryController from '../controllers/CategoryController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, categoryController.create)
router.get('/get_all_categories', middlewareAuth.verifyToken, categoryController.get_all_categories)
router.get('/detailBySlug?:slug', categoryController.detailBySlug)
router.get('/detail?:id', categoryController.detail)
// router.get('/detail', categoryController.detail)

module.exports = router;

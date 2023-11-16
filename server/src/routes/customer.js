import express from 'express'
const router = express.Router()
import customerController from '../controllers/CustomerController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'

// router.post('/create', middlewareAuth.verifyToken, uploadCloud.single("image"), CustomerController.create)
router.get('/getAll', customerController.getAll)
router.get('/getAllByAdmin', middlewareAuth.verifyTokenStaff, customerController.getAllByAdmin)
router.get('/detailBySlug?:slug', customerController.detailBySlug)
router.get('/detail?:id', customerController.detail)
// router.get('/detail', middlewareAuth.verifyToken, customerController.detail)
router.put('/updateCustomer', middlewareAuth.verifyToken, uploadCloud.single("image"), customerController.updateCustomer)
router.post('/createCustomer', middlewareAuth.verifyTokenStaff, uploadCloud.single("image"), customerController.register)

module.exports = router;

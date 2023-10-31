import express from 'express'
const router = express.Router()
import adminController from '../controllers/AdminController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'


router.post('/register', adminController.register)
router.post('/createCustomer', uploadCloud.single("image"), adminController.createCustomer)
router.post('/createAdmin', uploadCloud.single("image"), adminController.register)
router.post('/login', adminController.login) //middlewareAuth.verifyTokenAdmin
router.delete('/deleteCustomer?:id', adminController.deleteCustomer)
router.delete('/deleteAdmin?:id', adminController.deleteAdmin)
router.delete('/deleteAdmin?:id', adminController.deleteAdmin)
router.delete('/deletePost?:id', adminController.deletePost)
router.delete('/deleteCategory?:id', adminController.deleteCategory)
router.delete('/deleteComment?:id', adminController.deleteComment)
router.put('/updateStatus', adminController.updateStatus)
router.put('/updateCategory', adminController.updateCategory)
router.put('/updateCustomer', uploadCloud.single("image"), adminController.updateCustomer)
router.put('/updateAdmin', uploadCloud.single("image"), adminController.updateAdmin)
router.get('/getListAdmin', adminController.getListAdmin)
router.get('/getAllPostByAdmin', adminController.getAllPostByAdmin)
router.get('/getAllCategoryByAdmin', adminController.getAllCategoryByAdmin)
router.get('/getDetailAdmin', adminController.detail)
// router.get('/getDataCustomer', middlewareAuth.verifyToken, AdminAuthController.getDataCustomer)

module.exports = router;

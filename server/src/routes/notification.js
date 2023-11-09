import express from 'express'
const router = express.Router()
import notificationController from '../controllers/NotificationController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'


router.post('/addNotification', middlewareAuth.verifyToken, notificationController.addNotification)
router.get('/getAllNotification', notificationController.getAllNotification)
router.get('/getNotificationByCustomer', middlewareAuth.verifyToken, notificationController.getNotificationByCustomer)
// router.get('/getDataCustomer', middlewareAuth.verifyToken, authController.getDataCustomer)

module.exports = router;

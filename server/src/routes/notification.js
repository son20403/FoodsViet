import express from 'express'
const router = express.Router()
import notificationController from '../controllers/NotificationController'
import uploadCloud from '../middlewares/uploader'
import middlewareAuth from '../middlewares/auth'


router.post('/addNotification', middlewareAuth.verifyToken, notificationController.addNotification)
router.delete('/deleteNotification', middlewareAuth.verifyToken, notificationController.deleteNotification)
router.delete('/deleteAllNotificationByCustomer', middlewareAuth.verifyToken, notificationController.deleteAllNotificationByCustomer)
router.get('/getAllNotification', notificationController.getAllNotification)
router.get('/getNotificationByCustomer', middlewareAuth.verifyToken, notificationController.getNotificationByCustomer)
router.put('/updateNotification', middlewareAuth.verifyToken, notificationController.updateStatusNotification)
router.put('/updateAllNotificationByCustomer', middlewareAuth.verifyToken, notificationController.updateAllStatusNotificationByCustomer)
// router.get('/getDataCustomer', middlewareAuth.verifyToken, authController.getDataCustomer)

module.exports = router;

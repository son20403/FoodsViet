import express from 'express'
const router = express.Router()
import commentController from '../controllers/CommentController'
import middlewareAuth from '../middlewares/auth'

router.post('/create', middlewareAuth.verifyToken, commentController.create)
router.put('/updateComment', middlewareAuth.verifyToken, commentController.updateComment)
router.get('/get_all_comments', middlewareAuth.verifyToken, commentController.get_all_comments)
router.get('/getByPost', middlewareAuth.verifyToken, commentController.getByPost)
router.delete('/deleteComment?:id', middlewareAuth.verifyToken, commentController.deleteComment)

module.exports = router;

import express from 'express'
const router = express.Router()
import messageController from '../controllers/MessageController';

router.post("/",messageController.addMessage)
router.get("/:conversationId",messageController.getMessage)


module.exports = router;

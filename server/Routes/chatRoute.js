import express from 'express'
import { createChat,userChats,findChat, deleteChat } from '../Controllers/ChatControllers.js'
const router=express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.delete('/dele/:chatId',deleteChat)

export default router
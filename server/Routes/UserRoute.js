import  express  from "express";
import { getUser,updateUser,deleteUser,followUser,UnFollowUser,getAllUsers } from "../Controllers/UserController.js";
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router=express.Router()

// router.get('/',async(req,res)=>{
//     res.send('user route')
// })

router.get('/:id', getUser)
router.get('/',getAllUsers)
router.put('/:id',authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnFollowUser)
export default router;
import {Router} from 'express'
import { login, logout, selectRole, signup, updateProfile } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)

//secured routes
router.route("/role").post(verifyJWT,selectRole)
router.route("/user-details").post(verifyJWT,updateProfile)
router.route("/logout").get(verifyJWT,logout)

export default router

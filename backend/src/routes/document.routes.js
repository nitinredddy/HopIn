import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { getAllDocuments, getUserDocuments, updateDocumentVerificationStatus, verifyDriver } from '../controllers/document.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route("/verify-pilot").post(verifyJWT,upload.single("file"),verifyDriver)
router.route("/your-documents").get(verifyJWT,getUserDocuments)
router.route("/all-documents").get(verifyJWT,getAllDocuments)
router.route("/approve-document").post(verifyJWT,updateDocumentVerificationStatus)

export default router

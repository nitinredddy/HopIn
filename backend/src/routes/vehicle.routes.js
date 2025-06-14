import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { approveOrRejectVehicleRequest, getAllVehicleRequests, requestToAddVehicle } from '../controllers/vehicle.controller.js'

const router = Router()

router.route("/register-vehicle").post(verifyJWT,requestToAddVehicle)
router.route("/get-all-vehicle-requests").get(verifyJWT,getAllVehicleRequests)
router.route("approve-vehicle-request").post(verifyJWT,approveOrRejectVehicleRequest)

export default router

import { Router } from "express"
import { getDirection } from "../controllers/direction"
import { errorHandler } from "../middlewares/errorHandler.js"

const router = Router()

router.get("/direction", errorHandler(getDirection))

export default router

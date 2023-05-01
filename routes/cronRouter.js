import { Router } from "express";
import { updateChargebackStatus } from "../controllers/cron.js";



const cronRouter = Router();

cronRouter.get('/',updateChargebackStatus)

export default cronRouter;
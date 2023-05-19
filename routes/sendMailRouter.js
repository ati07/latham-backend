import { Router } from "express";
import { sendMail } from "../controllers/mailer.js";

const sendMailRouter = Router();
sendMailRouter.get('/',sendMail)
sendMailRouter.post('/',sendMail)
// sendMail

export default sendMailRouter;
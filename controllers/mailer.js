import { mail } from '../helper/mail.js';
import tryCatch from './utils/tryCatch.js';


export const sendMail = async(req, res) =>{
  await mail()


    res.status(200).json({ 
        success: true, 
        // result: chargebacks, 
        // merchants:merchant,
        // clients:client,
        // dbas:dba 
    });
}
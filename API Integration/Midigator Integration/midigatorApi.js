// import Ethoca from '../models/Ethoca.js';

import Ethoca from "../../models/Ethoca.js";

export const midgatorApi = async(req,res)=>{
    console.log("Midigator req res",req.body);
    await Ethoca.insertMany(req.body).then(function () {
        console.log("Data inserted in Ethoca Alert")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
    });
    res.status(201).json({ success: true, result: 'midigator hit' });
}
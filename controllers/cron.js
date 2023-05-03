import Chargebacks from "../models/Chargebacks.js";
import tryCatch from "./utils/tryCatch.js";




export const updateChargebackStatus = tryCatch(async (req, res) => {
    const chargebacksStatus = await Chargebacks.find({ status: 'Open' }).sort({ _id: -1 });
    const needToChageStatus = chargebacksStatus.filter((i) => new Date(i.due_date).getTime() < new Date().getTime())
    // console.log('needToChageStatus', needToChageStatus)
    needToChageStatus.map(async (i) => {
    await Chargebacks.findByIdAndUpdate(
            i._id,
            {status:'Due'}
            // { new: true }
        );
    })
    // res.status(200).json({ success: true, result: needToChageStatus })
})
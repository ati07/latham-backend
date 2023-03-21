import mongoose from "mongoose";

const ethocaSchema = mongoose.Schema(
    {
        merchant: { type: String },
        client: { type: String },
        descriptor: { type: String },
        issuer: { type: String },
        created: { type: String },
        trans_date: { type: String },
        arn: { type: String },
        ethoca_id: { type: String },
        mid_live: { type: String },
        acquirer: { type: String },
        mid:{ type: String },
        bin: { type: String },
        alert_date: { type: String },
        card_number: { type: String },
        transation_id: { type: String },
        alert_type: { type: String },
        alert_date_time: { type: String },
        amount: { type: String },
        cb_code: { type: String },
    },
    { timestamps: true }
)
const Ethoca = mongoose.model('ethoca', ethocaSchema);
export default Ethoca;
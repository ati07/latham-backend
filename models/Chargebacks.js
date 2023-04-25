import mongoose from "mongoose";

const chargebacksSchema = mongoose.Schema(
{
    merchant: { type: String },
    client: { type: String },
    descriptor: { type: String },
    issuer: { type: String },
    file_date: { type: String },
    mid:{ type: String },
    cb_code: { type: String },
    transaction_id: { type: String },
    acquirer: { type: String },
    due_date: { type: String },
    card_number: { type: String },
    amount: { type: String },
    status:{type: String}
},
    { timestamps: true }
)
const Chargebacks = mongoose.model('chargebacks', chargebacksSchema);
export default Chargebacks;
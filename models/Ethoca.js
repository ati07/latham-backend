import mongoose from "mongoose";

const ethocaSchema = mongoose.Schema(
    {
        dba: { type: String },
        merchant: { type: String },
        client: { type: String },
        descriptor: { type: String },
        issuer: { type: String },
        created: { type: String },
        trans_date: { type: String },
        ethoca_id: { type: String },
        mid_live: { type: String },
        acquirer: { type: String },
        bin: { type: String },
        alert_date: { type: String },
        card_number: { type: String },
        transaction_id: { type: String },
        alert_type: { type: String },
        alert_date_time: { type: String },
        cb_code: { type: String },
        mid:{ type: String },
        amount: { type: String },
        arn: { type: String },
        card_first_6: { type: String },
        card_last_4: { type: String },
        currency: { type: String },
        event_guid: { type: String },
        event_timestamp: { type: String },
        event_type: { type: String },
        merchant_descriptor: { type: String },
        prevention_case_number: { type: String },
        prevention_guid: { type: String },
        prevention_timestamp: { type: String },
        prevention_type: { type: String },
        transaction_timestamp: { type: String }
    },
    { timestamps: true }
)
const Ethoca = mongoose.model('ethoca', ethocaSchema);
export default Ethoca;
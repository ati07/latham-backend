import mongoose from "mongoose";

const rdrSchema = mongoose.Schema(
{
    dba: { type: String },
    merchant: { type: String },
    client: { type: String },
    lookup_source_type: { type: String },
    descriptor: { type: String },
    issuer: { type: String },
    report_start_date: { type: String },
    report_end_date: { type: String },
    acquirer_bin: { type: String },
    caid: { type: String },
    authorization_code: { type: String },
    acquirer: { type: String },
    mid:{ type: String },
    order_match_flag: { type: String },
    issue_int_name: { type: String },
    insight_id: { type: String },
    oi_digital_flag: { type: String },
    lookup_date: { type: String },
    deflection_settled_date: { type: String },
    transaction_type: { type: String },
    order_id: { type: String },
    delfection_eligible_flag: { type: String },
    amount: { type: String },
    currency: { type: String },
    transaction_request_id: { type: String },
    card_bin: { type: String },
    card_last_four: { type: String },
},
    { timestamps: true }
)
const Rdr = mongoose.model('rdr', rdrSchema);
export default Rdr;
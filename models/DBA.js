import mongoose from "mongoose";

const DBASchema = mongoose.Schema(
{
    dba:{ type: String },
    merchant: { type: String },
    client: { type: String },
    descriptor: { type: String },
    rdrtier: { type: String },
    mcc: { type: String },
    email: {
        type: String,
        // min: 5,
        // max: 50
    },
    caid: { type: String },
    midlive: { type: String },
    acquirer: { type: String },
    rdrstatus: { type: String },
    visa_bin: { type: String },
    mc_bin: { type: String },
    mid: { type: String },
    ethocalimit: { type: String },
    arn: { type: String },
    activate_rdr: { type: String },
    activate_ethoca: { type: String },
    mid_status: { type: String },
    processing_limit:{ type: String },
    ethocastatus: { type: String },
    mastercard_bin: { type: String },
},
    { timestamps: true }
)
const DBA = mongoose.model('dba', DBASchema);
export default DBA;
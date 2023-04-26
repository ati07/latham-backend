import mongoose from "mongoose";

const merchantSchema = mongoose.Schema(
{
    merchant: { type: String },
    client: { type: String },
    descriptor: { type: String },
    rdrtier: { type: String },
    mcc: { type: String },
    email: {
        type: String,
        min: 5,
        max: 50,
        trim: true
    },
    caid: { type: String },
    midlive: { type: String },
    acquirer: { type: String },
    rdrstatus: { type: String },
    visa_bin: { type: String },
    mc_bin: { type: String },
    mid: { type: String },
    etocastatus: { type: String },
    ethocalimit: { type: String }
},
    { timestamps: true }
)
const Merchant = mongoose.model('merchant', merchantSchema);
export default Merchant;
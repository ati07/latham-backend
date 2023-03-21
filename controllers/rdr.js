import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';
// {
//   merchant,
//   client,
//   lookup_source_type,
//   descriptor,
//   issuer,
//   report_start_date,
//   report_end_date,
//   acquirer_bin,
//   caid,
//   authorization_code,
//   acquirer,
//   mi,
//   order_match_flag,
//   issue_int_name,
//   insight_id,
//   oi_digital_flag,
//   lookup_date,
//   deflection_settled_date,
//   transaction_type,
//   order_id,
//   delfection_eligible_flag,
//   amount,
//   currency,
//   transation_request_id,
//   card_bin,
//   card_last_four,
// }
export const createRdr = tryCatch(async (req, res) => {
  const { id: uid, 
    merchant,
    client,
    lookup_source_type,
    descriptor,
    issuer,
    report_start_date,
    report_end_date,
    acquirer_bin,
    caid,
    authorization_code,
    acquirer,
    mid,
    order_match_flag,
    issue_int_name,
    insight_id,
    oi_digital_flag,
    lookup_date,
    deflection_settled_date,
    transaction_type,
    order_id,
    delfection_eligible_flag,
    amount,
    currency,
    transation_request_id,
    card_bin,
    card_last_four,
   } = req.body;
  const newrdr = new Rdr({
    merchant,
    client,
    lookup_source_type,
    descriptor,
    issuer,
    report_start_date,
    report_end_date,
    acquirer_bin,
    caid,
    authorization_code,
    acquirer,
    mid,
    order_match_flag,
    issue_int_name,
    insight_id,
    oi_digital_flag,
    lookup_date,
    deflection_settled_date,
    transaction_type,
    order_id,
    delfection_eligible_flag,
    amount,
    currency,
    transation_request_id,
    card_bin,
    card_last_four,
   });
  await newrdr.save();
  res.status(201).json({ success: true, result: newrdr });
});

export const getRdr = tryCatch(async (req, res) => {
  const rdr = await Rdr.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: rdr });
});

export const deleteRdr = tryCatch(async (req, res) => {
  const { _id } = await Rdr.findByIdAndDelete(req.params.rdrId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateRdr = tryCatch(async (req, res) => {
  // const updateddr = await Rdr.findByIdAndUpdate(
  //   req.params.rdrId,
  //   req.body,
  //   { new: true }
  // );
  const updatedrdr = await Rdr.updateOne(
    {_id:req.params.rdrId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedrdr });
});
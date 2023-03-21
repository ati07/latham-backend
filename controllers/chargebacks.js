import Chargebacks from '../models/Chargebacks.js';
import tryCatch from './utils/tryCatch.js';

export const createChargebacks = tryCatch(async (req, res) => {
  const { id: uid, merchant,
    client,
    descriptor,
    issuer,
    trans_date,
    mid,
    cb_code,
    transation_id,
    acquirer,
    due_date,
    card_number,
    amount } = req.user;
  const newChargebacks = new Chargebacks({ merchant,
    client,
    descriptor,
    issuer,
    trans_date,
    mid,
    cb_code,
    transation_id,
    acquirer,
    due_date,
    card_number,
    amount });
  await newChargebacks.save();
  res.status(201).json({ success: true, result: newChargebacks });
});

export const getChargebacks = tryCatch(async (req, res) => {
  const chargebacks = await Chargebacks.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: chargebacks });
});

export const deleteChargebacks = tryCatch(async (req, res) => {
  const { _id } = await Chargebacks.findByIdAndDelete(req.params.chargebacksId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateChargebacks = tryCatch(async (req, res) => {
  // const updatedChargebacks = await Chargebacks.findByIdAndUpdate(
  //   req.params.chargebacksId,
  //   req.body,
  //   { new: true }
  // );
  const updatedChargebacks = await Chargebacks.updateOne(
    {_id:req.params.chargebacksId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedChargebacks });
});
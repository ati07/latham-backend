import Chargebacks from '../models/Chargebacks.js';
import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createChargebacks = tryCatch(async (req, res) => {
  const { id: uid, dba,merchant,
    client,
    descriptor,
    issuer,
    file_date,
    mid,
    cb_code,
    transaction_id,
    acquirer,
    due_date,
    card_number,
    amount,status } = req.body;
  const newChargebacks = new Chargebacks({ 
    ...req.body.data,
    dba,
    merchant,
    client,
    descriptor,
    issuer,
    file_date,
    mid,
    cb_code,
    transaction_id,
    acquirer,
    due_date,
    card_number,
    amount,status });
  await newChargebacks.save();
  res.status(201).json({ success: true, result: newChargebacks });
});

export const getChargebacks = tryCatch(async (req, res) => {
  const chargebacks = await Chargebacks.find().sort({ _id: -1 });
  const merchant = await Merchant.find().sort({ _id: -1 });
  const client = await Client.find().sort({ _id: -1 });
  const dba = await DBA.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: chargebacks, merchants:merchant,clients:client,dbas:dba });
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
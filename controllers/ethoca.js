import Client from '../models/Client.js';
import Ethoca from '../models/Ethoca.js';
import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createEthoca = tryCatch(async (req, res) => {
  const { id: uid,merchant,
    client,
    descriptor,
    issuer,
    created,
    trans_date,
    arn,
    ethoca_id,
    mid_live,
    acquirer,
    mid,
    bin,
    alert_date,
    card_number,
    transaction_id,
    alert_type,
    alert_date_time,
    amount,
    cb_code } = req.body;
  const newEthoca = new Ethoca({ merchant,
    client,
    descriptor,
    issuer,
    created,
    trans_date,
    arn,
    ethoca_id,
    mid_live,
    acquirer,
    mid,
    bin,
    alert_date,
    card_number,
    transaction_id,
    alert_type,
    alert_date_time,
    amount,
    cb_code });
  await newEthoca.save();
  res.status(201).json({ success: true, result: newEthoca });
});

export const getEthoca = tryCatch(async (req, res) => {
  const ethoca = await Ethoca.find().sort({ _id: -1 });
  const client = await Client.find().sort({ _id: -1 });
  const merchant = await Merchant.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethoca,merchants:merchant, clients:client });
});

export const deleteEthoca = tryCatch(async (req, res) => {
  const { _id } = await Ethoca.findByIdAndDelete(req.params.ethocaId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateEthoca = tryCatch(async (req, res) => {
  // const updatedEthoca = await Ethoca.findByIdAndUpdate(
  //   req.params.ethocaId,
  //   req.body,
  //   { new: true }
  // );
  const updatedEthoca = await Ethoca.updateOne(
    {_id:req.params.ethocaId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedEthoca });
});
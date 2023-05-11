import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Ethoca from '../models/Ethoca.js';
import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createEthoca = tryCatch(async (req, res) => {
  const { id: uid,dba,merchant,
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
  const newEthoca = new Ethoca({ dba,merchant,
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
  const dba = await DBA.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethoca,merchants:merchant, clients:client,dbas:dba });
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

export const filterEthoca = tryCatch(async(req, res)=>{
  let filterData = {}

  if(!req.body.client.includes('All')) {
    filterData['client'] = {$in:req.body.client}
  }
  if(!req.body.merchants.includes('All')) {
    filterData['merchant'] = {$in:req.body.merchants}
  }
  const ethoca = await Ethoca.find(filterData).sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethoca });
})
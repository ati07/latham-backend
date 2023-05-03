import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createDBA = tryCatch(async (req, res) => {
    // console.log("req",req.body)
  const { dba,
    merchant,
    client,
    descriptor,
    rdrtier,
    mcc,
    email,
    caid,
    midlive,
    acquirer,
    rdrstatus,
    visa_bin,
    mc_bin,
    mid,
    etocastatus,
    ethocalimit } = req.body;
    // console.log("object",req.body);
  const newDBA = new DBA({ 
    ...req.body.data,
    dba, 
    merchant,
    client,
    descriptor,
    rdrtier,
    mcc,
    email,
    caid,
    midlive,
    acquirer,
    rdrstatus,
    visa_bin,
    mc_bin,
    mid,
    etocastatus,
    ethocalimit });
  await newDBA.save();
  res.status(201).json({ success: true, result: newDBA });
});

export const getDBA = tryCatch(async (req, res) => {
  const client = await Client.find().sort({ _id: -1 });
  const dba = await DBA.find().sort({ _id: -1 });
  const merchants = await Merchant.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: dba, clients: client,merchants: merchants });
});

export const deleteDBA = tryCatch(async (req, res) => {
  const { _id } = await DBA.findByIdAndDelete(req.params.dbaId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateDBA = tryCatch(async (req, res) => {
  // const updatedMerchant = await Merchant.findByIdAndUpdate(
  //   req.params.merchantId,
  //   req.body,
  // );
  const updatedDBA = await DBA.updateOne(
    {_id:req.params.dbaId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedDBA });
});
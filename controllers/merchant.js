import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createMerchant = tryCatch(async (req, res) => {
    // console.log("req",req.body)
  const { merchant,
    client,
    descriptor,
    rdrtier,
    mcc,
    email,
    caid,
    midlive,
    acquirer,
    rdrstatus,
    bin,
    mid,
    etocastatus,
    ethocalimit } = req.body;
    // console.log("object",req.body);
  const newMerchant = new Merchant({ 
    ...req.body.data, 
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
    bin,
    mid,
    etocastatus,
    ethocalimit });
  await newMerchant.save();
  res.status(201).json({ success: true, result: newMerchant });
});

export const getMerchant = tryCatch(async (req, res) => {
  const merchant = await Merchant.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchant });
});

export const deleteMerchant = tryCatch(async (req, res) => {
  const { _id } = await Merchant.findByIdAndDelete(req.params.merchantId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateMerchant = tryCatch(async (req, res) => {
  // const updatedMerchant = await Merchant.findByIdAndUpdate(
  //   req.params.merchantId,
  //   req.body,
  // );
  const updatedMerchant = await Merchant.updateOne(
    {_id:req.params.merchantId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedMerchant });
});
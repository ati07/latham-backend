import Client from '../models/Client.js';
import Merchant from '../models/Merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createClient = tryCatch(async (req, res) => {
    // console.log("req",req.body)
  const { 
    merchant,
    name,
    phone_number,
    company,
    email,
    } = req.body;
    // console.log("object",req.body);
  const newClient = new Client({ 
    ...req.body.data, 
    merchant,
    name,
    phone_number,
    email,
    company });
  await newClient.save();
  res.status(201).json({ success: true, result: newClient });
});

export const getClient = tryCatch(async (req, res) => {
  const client = await Client.find().sort({ _id: -1 });
  const merchant = await Merchant.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: client, merchants:merchant });
});

export const deleteClient = tryCatch(async (req, res) => {
  const { _id } = await Client.findByIdAndDelete(req.params.ClientId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateClient = tryCatch(async (req, res) => {
  // const updatedClient = await Client.findByIdAndUpdate(
  //   req.params.ClientId,
  //   req.body,
  // );
  const updatedClient = await Client.updateOne(
    {_id:req.params.ClientId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result: updatedClient });
});
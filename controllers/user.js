import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import Room from '../models/Room.js';
import Client from '../models/Client.js';

export const register = tryCatch(async (req, res) => {
  const { name, email, password, client, role } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: 'User already exists!' });
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
    client,
    role
  });
  const { _id: id, photoURL, active, } = user;
  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token, role, active, user:user.client },
  });
});

export const login = tryCatch(async (req, res) => {
  console.log('req.body',req.body)
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res
      .status(404)
      .json({ success: false, message: 'User does not exist!' });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword)
    return res
      .status(400)
      .json({ success: false, message: 'Invalid credentials' });

  const { _id: id, name, photoURL, role, active,dateCreated,client } = existedUser;
  if (!active)
    return res.status(400).json({
      success: false,
      message: 'This account has been suspended! Try to contact the admin',
    });
  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token, role, active,dateCreated,client },
  });
});
export const updateUser = tryCatch(async (req, res) => {
  // const updateddr = await Rdr.findByIdAndUpdate(
  //   req.params.rdrId,
  //   req.body,
  //   { new: true }
  // );
  // console.log('req',req.body)
  const { name, email, password, client, role } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: 'Password must be 6 characters or more',
    });
  const emailLowerCase = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 12);
  const data ={
    name,
    email: emailLowerCase,
    password: hashedPassword,
    client,
    role
  }
  // req.body
  const updatedUser = await User.updateOne(
    {_id:req.params.userId},
    {
      $set:data
    })
  res.status(200).json({ success: true, result: updatedUser });
});
export const deleteUser= tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.photoURL
    ? { name: req.body.name, photoURL: req.body.photoURL }
    : { name: req.body.name };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
  });
  const { _id: id, name, photoURL, role } = updatedUser;

  await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ success: true, result: { name, photoURL, token } });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  const client = await Client.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users, clients:client });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});

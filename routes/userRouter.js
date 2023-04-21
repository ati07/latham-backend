import { Router } from 'express';
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateProfile,
  updateStatus,
  updateUser,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import userPermissions from '../middleware/permissions/user/userPermissions.js';

const userRouter = Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/updateProfile', auth, updateProfile);
userRouter.put('/:userId',auth,updateUser)
userRouter.delete(
  '/:userId',
  auth,
//   checkAccess(rdrPermissions.delete),
  deleteUser
);
userRouter.get('/', getUsers);
// auth, checkAccess(userPermissions.listUsers),
userRouter.patch(
  '/updateStatus/:userId',
  auth,
  checkAccess(userPermissions.updateStatus),
  updateStatus
);

export default userRouter;

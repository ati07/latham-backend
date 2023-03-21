import { Router } from 'express';

import {
  createChargebacks,
  deleteChargebacks,
  getChargebacks,
  updateChargebacks,
} from '../controllers/chargebacks.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import chargebacksPermissions from '../middleware/permissions/chargebacks/chargebacksPermissions.js';
// auth,
const chargebacksRouter = Router();
chargebacksRouter.post('/', auth,createChargebacks);
chargebacksRouter.get('/', getChargebacks);
chargebacksRouter.delete(
  '/:chargebacksId',
  auth,
//   checkAccess(chargebacksPermissions.delete),
  deleteChargebacks
);
chargebacksRouter.put(
  '/:chargebacksId',
  auth,
//   checkAccess(chargebacksPermissions.update),
  updateChargebacks
);
export default chargebacksRouter;

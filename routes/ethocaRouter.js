import { Router } from 'express';

import {
  createEthoca,
  deleteEthoca,
  filterEthoca,
  getEthoca,
  updateEthoca,
} from '../controllers/ethoca.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import ethocaPermissions from '../middleware/permissions/ethoca/ethocaPermissions.js';
// auth,
const ethocaRouter = Router();
ethocaRouter.post('/', auth,createEthoca);
ethocaRouter.post('/filter/',auth, filterEthoca);
ethocaRouter.get('/', getEthoca);
ethocaRouter.delete(
  '/:ethocaId',
  auth,
//   checkAccess(ethocaPermissions.delete),
  deleteEthoca
);
ethocaRouter.put(
  '/:ethocaId',
  auth,
//   checkAccess(ethocaPermissions.update),
  updateEthoca
);
export default ethocaRouter;

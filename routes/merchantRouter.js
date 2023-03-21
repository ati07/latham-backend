import { Router } from 'express';

import {
  createMerchant,
  deleteMerchant,
  getMerchant,
  updateMerchant,
} from '../controllers/merchant.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import merchantPermissions from '../middleware/permissions/merchant/merchantPermissions.js';
// auth,
const merchantRouter = Router();
merchantRouter.post('/', auth,createMerchant);
merchantRouter.get('/', getMerchant);
merchantRouter.delete(
  '/:merchantId',
  auth,
//   checkAccess(merchantPermissions.delete),
  deleteMerchant
);
merchantRouter.put(
  '/:merchantId',
  auth,
//   checkAccess(merchantPermissions.update),
  updateMerchant
);
export default merchantRouter;

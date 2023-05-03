import { Router } from 'express';

import {
  createDBA,
  deleteDBA,
  getDBA,
  updateDBA,
} from '../controllers/DBA.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import merchantPermissions from '../middleware/permissions/merchant/merchantPermissions.js';
// auth,
const dbaRouter = Router();
dbaRouter.post('/', auth,createDBA);
dbaRouter.get('/', getDBA);
dbaRouter.delete(
  '/:dbaId',
  auth,
//   checkAccess(merchantPermissions.delete),
  deleteDBA
);
dbaRouter.put(
  '/:dbaId',
  auth,
//   checkAccess(merchantPermissions.update),
  updateDBA
);
export default dbaRouter;

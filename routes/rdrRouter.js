import { Router } from 'express';

import {
  createRdr,
  deleteRdr,
  getRdr,
  updateRdr,
} from '../controllers/rdr.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import rdrPermissions from '../middleware/permissions/rdr/rdrPermissions.js';
// auth,
const rdrRouter = Router();
rdrRouter.post('/', auth,createRdr);
rdrRouter.get('/', getRdr);
rdrRouter.delete(
  '/:rdrId',
  auth,
//   checkAccess(rdrPermissions.delete),
  deleteRdr
);
rdrRouter.put('/:rdrId',
  auth,
//   checkAccess(rdrPermissions.update),
  updateRdr
);
export default rdrRouter;

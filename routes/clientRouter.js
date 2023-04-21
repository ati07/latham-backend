import { Router } from 'express';

import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from '../controllers/client.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
// import ClientPermissions from '../middleware/permissions/Client/ClientPermissions.js';
// auth,
const clientRouter = Router();
clientRouter.post('/', auth,createClient);
clientRouter.get('/', getClient);
clientRouter.delete(
  '/:ClientId',
  auth,
//   checkAccess(ClientPermissions.delete),
  deleteClient
);
clientRouter.put(
  '/:ClientId',
  auth,
//   checkAccess(ClientPermissions.update),
  updateClient
);
export default clientRouter;
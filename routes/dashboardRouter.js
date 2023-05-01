import { Router } from 'express';

import {
    getDashboardData,
} from '../controllers/dashboard.js';
import auth from '../middleware/auth.js';

const dashboardRouter = Router();
dashboardRouter.post('/',auth, getDashboardData);
// dashboardRouter.get('/updatestatus',updateChargebackStatus)
export default dashboardRouter;

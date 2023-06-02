import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import merchantRouter from './routes/merchantRouter.js';
import rdrRouter from './routes/rdrRouter.js';
import ethocaRouter from './routes/ethocaRouter.js';
import chargebacksRouter from './routes/chargebacksRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';
import clientRouter from './routes/clientRouter.js';
import cronRouter from './routes/cronRouter.js';
import { updateChargebackStatus } from './controllers/cron.js';
import cron from 'node-cron'
import dbaRouter from './routes/dbaRouter.js';
import { sendMail } from './controllers/mailer.js';
import riskReportRouter from './routes/riskreportRouter.js';
import sendMailRouter from './routes/sendMailRouter.js';
import { verifyScript } from './controllers/verifyScript/verifyScript.js';
// var cron = require('node-cron');

cron.schedule('* 23 * * *', () => {
  // console.log('running a task every minute');
  updateChargebackStatus()
});
cron.schedule('* * * * *',()=>{
  console.log('running a task every minute verfiy');
  verifyScript()
})
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/user', userRouter);
app.use('/merchant', merchantRouter);
app.use('/dba', dbaRouter);
app.use('/client', clientRouter);
app.use('/rdr',rdrRouter)
app.use('/ethoca',ethocaRouter)
app.use('/chargebacks',chargebacksRouter)
app.use('/getdashboard',dashboardRouter)
app.use('/getriskreport',riskReportRouter)
app.use('/updatestatus',cronRouter)
app.use('/sendmail',sendMailRouter)

app.use('/room', roomRouter);
app.get('/', (req, res) => res.json({ message: 'Welcome to our API' }));
// app.get('/sendmail',sendMail)


app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Not Found' })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT).then(()=>console.log("db connected"));
    app
      .listen(port, () => console.log(`Server is listening on port: ${port}`))
      .on('error', (e) => {
        console.log('Error happened: ', e.message);
      });
  } catch (error) {
    console.log(error);
  }
};


startServer();

import Chargebacks from '../models/Chargebacks.js';
import Client from '../models/Client.js';
import Ethoca from '../models/Ethoca.js';
import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';



export const getDashboardData = tryCatch(async (req, res) => {
  // console.log('reqDash', JSON.parse(req.body.current))
  // console.log('reqDash', JSON.parse(req.body.current))
  const data = JSON.parse(req.body.current)
  // console.log('chargebacksDarre', new Date(data.end_date))
  const client = await Client.find().sort({ _id: -1 });
  const chargebacks = await Chargebacks.find({
    createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
  }).sort({ _id: -1 });
  // console.log('chargebacks', chargebacks)
  const wonChargebacks = await Chargebacks.find({ status: 'Won', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } });
  const inProcessChargebacks = await Chargebacks.find({ status: 'In process', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } });
  const openCases = await Chargebacks.find({ status: 'Open', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } });
  const urgentActionRequired = await Chargebacks.find({ status: 'Due', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } })
  const closedCases = await Chargebacks.find({ status: 'Closed', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } })
  const expired = await Chargebacks.find({ status: 'Expired', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } })
  const ethoca = await Ethoca.find({
    createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
  }).sort({ _id: -1 });
  const rdr = await Rdr.find({
    createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
  }).sort({ _id: -1 });

  const totalCB = chargebacks.length
  const projectedSavings = inProcessChargebacks.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0) * (65 / 100)
  const savedRevenue = wonChargebacks.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0)
  const Percentage = {
    totalStatus: chargebacks.length,
    expired: expired.length
  }
  const lostRevenueAndFines = expired.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0) + (chargebacks.length * 35.00)
  const TotalClosedCases = closedCases.length
  const totalUrgentActionRequired = urgentActionRequired.length
  const potentialRevenueLoss = openCases.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0) + urgentActionRequired.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0)
  const totalOpencases = openCases.length
  const totalInprocess = inProcessChargebacks.length
  const totalWonChargebacks = wonChargebacks.length
  const casesWon = wonChargebacks.length

  const avoidedFines = ethoca.length + (rdr.length * 35.00)
  const avoidedChargebacks = ethoca.length + rdr.length
  //   console.log("wonChargebacks",wonChargebacks,totalWonChargebacks)
  res.status(200).json({
    success: true, result: {
      RevenueSavings: totalWonChargebacks,
      AvoidedFines: avoidedFines,
      AvoidedChargebacks: avoidedChargebacks,
      TotalCB: totalCB,
      InProcess: totalInprocess,
      ProjectedSavings: projectedSavings,
      CasesWon: casesWon,
      SavedRevenue: savedRevenue,
      OpenCases: totalOpencases,
      UrgentActionRequired: totalUrgentActionRequired,
      PotentialRevenueLoss: potentialRevenueLoss,
      TotalCases: TotalClosedCases,
      Percentage: Percentage,
      LostRevenueAndFines: lostRevenueAndFines,
      clients:client
    }
  });

})
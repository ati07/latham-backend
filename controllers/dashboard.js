import Chargebacks from '../models/Chargebacks.js';
import Ethoca from '../models/Ethoca.js';
import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';



export const getDashboardData= tryCatch(async (req, res) => {
  const chargebacks = await Chargebacks.find().sort({ _id: -1 });
  const totalCB = chargebacks.length
  const wonChargebacks = await Chargebacks.find({status:'Won'});
  const inProcessChargebacks = await Chargebacks.find({status:'In process'});
  const projectedSavings = inProcessChargebacks.map((i)=>i.amount).reduce((total, num)=>total + parseInt(num),0) * (65/100)
  const savedRevenue = wonChargebacks.map((i)=>i.amount).reduce((total, num)=>total + parseInt(num),0)
  const openCases = await Chargebacks.find({status:'Open'});
  const urgentActionRequired = await Chargebacks.find({status:'Due'})
  const closedCases = await Chargebacks.find({status:'Closed'})
  const expired = await Chargebacks.find({status:'Expired'})
  const Percentage = {
    totalStatus: chargebacks.length,
    expired: expired.length
  }
  const lostRevenueAndFines = expired.map((i)=>i.amount).reduce((total, num)=>total + parseInt(num),0) + (chargebacks.length * 35.00)
  const TotalClosedCases = closedCases.length
  const totalUrgentActionRequired = urgentActionRequired.length
  const potentialRevenueLoss = openCases.map((i)=>i.amount).reduce((total, num)=>total + parseInt(num),0) + urgentActionRequired.map((i)=>i.amount).reduce((total, num)=>total + parseInt(num),0)
  const totalOpencases = openCases.length
  const totalInprocess = inProcessChargebacks.length
  const totalWonChargebacks = wonChargebacks.length
  const casesWon = wonChargebacks.length
  const ethoca = await Ethoca.find().sort({ _id: -1 });
  const rdr = await Rdr.find().sort({ _id: -1 });
  const avoidedFines = ethoca.length + (rdr.length * 35.00)
  const avoidedChargebacks =  ethoca.length + rdr.length
//   console.log("wonChargebacks",wonChargebacks,totalWonChargebacks)
  res.status(200).json({ success: true, result:{
    RevenueSavings: totalWonChargebacks,
    AvoidedFines:avoidedFines,
    AvoidedChargebacks:avoidedChargebacks,
    TotalCB: totalCB,
    InProcess:totalInprocess,
    ProjectedSavings:projectedSavings,
    CasesWon: casesWon,
    SavedRevenue:savedRevenue,
    OpenCases:totalOpencases,
    UrgentActionRequired:totalUrgentActionRequired,
    PotentialRevenueLoss: potentialRevenueLoss,
    TotalCases:TotalClosedCases,
    Percentage:Percentage,
    LostRevenueAndFines: lostRevenueAndFines
 } });

})
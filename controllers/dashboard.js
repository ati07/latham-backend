import Chargebacks from '../models/Chargebacks.js';
import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Ethoca from '../models/Ethoca.js';
import Merchant from '../models/Merchant.js';
import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';



export const getDashboardData = tryCatch(async (req, res) => {
  // console.log('reqDash', JSON.parse(req.body.current))
  // console.log('reqDash', JSON.parse(req.body.current))
  const data = JSON.parse(req.body.current)
  // console.log('chargebacksDarre', new Date(data.end_date))
  let client;
  let merchant;
  let dba;
  let chargebacks;
  let wonChargebacks
  let inProcessChargebacks
  let openCases;
  let urgentActionRequired;
  let closedCases;
  let expired;
  let ethoca;
  let rdr
  if (data.start_date 
    && data.end_date 
    && req.body.client
    && req.body.merchants
    && req.body.dbas
    ) {
              client = await Client.find().sort({ _id: -1 });
              merchant = await Merchant.find().sort({ _id: -1 });
              dba = await DBA.find().sort({ _id: -1 });
              let findChargebackData = {
                createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
              }
              let findwonChargebacks = { status: 'Won', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findinProcessChargebacks ={ status: 'In process', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findopenCases = { status: 'Open', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findclosedCases ={ status: 'Closed', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findurgentActionRequired ={ status: 'Due', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findexpired = { status: 'Expired', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
              let findethoca={
                createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
              }
              let findrdr={
                createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
              }
              if(!req.body.client.includes('All')) {
                findChargebackData['client'] = {$in:req.body.client}
                findwonChargebacks['client'] = {$in:req.body.client}
                findinProcessChargebacks['client'] = {$in:req.body.client}
                findopenCases['client'] = {$in:req.body.client}
                findclosedCases['client'] = {$in:req.body.client}
                findurgentActionRequired['client'] = {$in:req.body.client}
                findexpired['client'] = {$in:req.body.client}
                findethoca['client'] = {$in:req.body.client}
                findrdr['client'] = {$in:req.body.client}
              }
              if(!req.body.merchants.includes('All')) {
                findChargebackData['merchant'] = {$in:req.body.merchants}
                findwonChargebacks['merchant'] = {$in:req.body.merchants}
                findinProcessChargebacks['merchant'] = {$in:req.body.merchants}
                findopenCases['merchant'] = {$in:req.body.merchants}
                findclosedCases['merchant'] = {$in:req.body.merchants}
                findurgentActionRequired['merchant'] = {$in:req.body.merchants}
                findexpired['merchant'] = {$in:req.body.merchants}
                findethoca['merchant'] = {$in:req.body.merchants}
                findrdr['merchant'] = {$in:req.body.merchants}
              }
              if(!req.body.dbas.includes('All')) {
                findChargebackData['dba'] = {$in:req.body.dbas}
                findwonChargebacks['dba'] = {$in:req.body.dbas}
                findinProcessChargebacks['dba'] = {$in:req.body.dbas}
                findopenCases['dba'] = {$in:req.body.dbas}
                findclosedCases['dba'] = {$in:req.body.dbas}
                findurgentActionRequired['dba'] = {$in:req.body.dbas}
                findexpired['dba'] = {$in:req.body.dbas}
                findethoca['dba'] = {$in:req.body.dbas}
                findrdr['dba'] = {$in:req.body.dbas}
              }
              // if(!req.body.dbas==='all') {
              //   findChargebackData['dba'] = req.body.dbas
              //   findwonChargebacks['dba'] = req.body.dbas
              //   findinProcessChargebacks['dba'] = req.body.dbas
              //   findopenCases['dba'] = req.body.dbas
              //   findclosedCases['dba'] = req.body.dbas
              //   findurgentActionRequired['dba'] = req.body.dbas
              //   findexpired['dba'] = req.body.dbas
              //   findethoca['dba'] = req.body.dbas
              //   findrdr['dba'] = req.body.dbas
              // }
              
              chargebacks = await Chargebacks.find(findChargebackData).sort({ _id: -1 });
              // console.log('chargebacks', chargebacks)
              wonChargebacks = await Chargebacks.find(findwonChargebacks);
              inProcessChargebacks = await Chargebacks.find(findinProcessChargebacks);
              openCases = await Chargebacks.find(findopenCases);
              urgentActionRequired = await Chargebacks.find(findurgentActionRequired)
              closedCases = await Chargebacks.find(findclosedCases)
              expired = await Chargebacks.find(findexpired)
              ethoca = await Ethoca.find(findethoca).sort({ _id: -1 });
              rdr = await Rdr.find(findrdr).sort({ _id: -1 });

  }

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
      clients: client,
      merchants:merchant,
      dbas:dba
    }
  });

})


import Chargebacks from '../models/Chargebacks.js';
import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Ethoca from '../models/Ethoca.js';
import Merchant from '../models/Merchant.js';
import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';

export const getRiskReport = tryCatch(async (req, res) => {
  const data = JSON.parse(req.body.current)
  // console.log('chargebacksDarre', new Date(data.end_date))
  let client;
  let merchant;
  let dba;
  let dbas;
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
    dbas = await DBA.find().sort({ _id: -1 });
    let findDbaData = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }

    // console.log("object", findDbaData);

    if (!req.body.client.includes('All')) {
      findDbaData['client'] = { $in: req.body.client }
    }
    if (!req.body.merchants.includes('All')) {
      findDbaData['merchant'] = { $in: req.body.merchants }
    }
    if (!req.body.dbas.includes('All')) {
      findDbaData['dba'] = { $in: req.body.dbas }
    }

    dba = await DBA.find(findDbaData).sort({ _id: -1 });
    chargebacks = await Chargebacks.find(findDbaData).sort({ _id: -1 });
    ethoca = await Ethoca.find(findDbaData).sort({ _id: -1 });
    rdr = await Rdr.find(findDbaData).sort({ _id: -1 });
  }
  // console.log('dba,allDba', dba)
  const allDba = dba.map((i) => i.dba)
  // const removedDuplicats = [...new Set(allDba)]
  // console.log('dba,allDba',dba,allDba)
  const dbadata = []
  for (let i = 0; i < allDba.length; i++) {
    let d = dba.filter((obj) => obj.dba === allDba[i])
    // console.log('_id,createdAt',d)

    dbadata.push({
      id: d[0]._id,
      createdAt: d[0].createdAt,
      dba: allDba[i],
      status: d[0].mid_status,
      rdralerts: rdr.filter((obj) => obj.dba === allDba[i]).length,
      ethocaalerts: ethoca.filter((obj) => obj.dba === allDba[i]).length,
      chargebacks: chargebacks.filter((obj) => obj.dba === allDba[i]).length
    })
  }

  res.status(200).json({
    success: true,
    result: {
      riskreportData: dbadata,
      clients: client,
      merchants: merchant,
      dbas:dbas
    }
  })
})

import {ethers} from 'ethers'
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}

    let useContract = await import("../../../contract/useContract.ts");
    let { contract, signerAddress } = await useContract.default();
  
    if (req.method !== 'POST') {
      res.status(405).json({ status: 405, error: "Method must have POST request" })
      return;
    }
  
    const { userid, givenname,identifier, patientid } = req.body;
 
    await contract.UpdateFhir(Number(userid), givenname,identifier, patientid ).send({
      from:signerAddress,
      gasLimit: 6000000,
      gasPrice: ethers.utils.parseUnits('9.0', 'gwei')
    });
    res.status(200).json({ status: 200, value: "Updating!" })
  
  }
  
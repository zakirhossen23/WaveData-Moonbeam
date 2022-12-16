

export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}

  let useContract = await import("../../../contract/useContract.ts");
  let {contract,signerAddress} = await useContract.default();
  res.status(200).json({ value: await contract.CheckEmail(req.query.email).call() })
}

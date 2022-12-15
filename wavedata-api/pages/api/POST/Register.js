
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}



  let useContract = await import("../../../contract/useContract.ts");
  let { contract, signerAddress } = await useContract.default();

  if (req.method !== 'POST') {
    res.status(405).json({ status: 405, error: "Register must have POST request" })
    return;
  }

  const { fullname, email, password } = req.body;
  if (await contract.CheckEmail(email) !== "False"){
    res.status(403).json({ status: 403, error: "Account already exists!" })
    return;
  }
  await contract.CreateAccount(fullname, email, password);
  res.status(200).json({ status: 200, value: "Registered!" })

}

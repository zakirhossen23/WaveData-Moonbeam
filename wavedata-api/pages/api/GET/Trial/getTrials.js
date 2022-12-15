
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}
  
  let useContract = await import("../../../../contract/useContract.ts");
  let { contract, signerAddress } = await useContract.default();
  let Trials = [];
  for (let i = 0; i < Number(await contract._TrialIds()); i++) {
    let trial_element = await contract._trialMap(i);
    var newTrial = {
      id: Number(trial_element.trial_id),
      title: trial_element.title,
      image: trial_element.image,
      description: trial_element.description,
      contributors: Number(trial_element.contributors),
      audience: Number(trial_element.audience),
      budget: Number(trial_element.budget)
    };
    Trials.push(newTrial);
  }
  res.status(200).json({ value: JSON.stringify(Trials) })
}

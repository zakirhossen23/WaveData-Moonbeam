
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}

  let useContract = await import("../../../../contract/useContract.ts");
  let { contract, signerAddress } = await useContract.default();

  let trial_id = await contract.GetOngoingTrial(req.query.userid);
  let all_available_trials = [];
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
    if (trial_id !== "False") {
      if (Number(trial_id) !== newTrial.id)
        all_available_trials.push(newTrial);
    }else{
      all_available_trials.push(newTrial);
    }
  }
    res.status(200).json({ status: 200, value: JSON.stringify(all_available_trials) })
    return;
  
}

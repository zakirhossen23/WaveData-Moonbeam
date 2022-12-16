
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}



  let useContract = await import("../../../../../contract/useContract.ts");
  let { contract, signerAddress } = await useContract.default();

  let survey_element = await contract._surveyMap(req.query.surveyid).call() ;
  var new_survey = {
    id: Number(survey_element.survey_id),
    trial_id: Number(survey_element.trial_id),
    user_id: Number(survey_element.user_id),
    name: survey_element.name,
    description: survey_element.description,
    date: survey_element.date,
    image: survey_element.image,
    reward: Number(survey_element.reward),
    submission: Number(survey_element?.submission)
  };
  let allCategory = [];
  for (let i = 0; i < Number(await contract._SurveyCategoryIds().call() ); i++) {
    const element = await contract._categoryMap(i).call() ;
    allCategory.push({
      name: element.name,
      image: element.image
    })
  }

  let final = {
    Survey: new_survey,
    Sections: JSON.parse(await contract._sectionsMap(req.query.surveyid).call() ),
    Categories: allCategory
  }

  res.status(200).json({ status: 200, value: final })
  return;

}

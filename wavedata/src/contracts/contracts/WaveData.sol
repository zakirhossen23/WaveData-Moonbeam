// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/Strings.sol";

contract WaveData {

    /// User contains all the login information
    struct user_struct { 
        /// The ID of the User ID.
        uint256 user_id;
        ///Full Name of user
        string name;
        ///Email of user
        string email;
        ///Password of user
        string password;
        /// The User Image
        string image;
        /// The User Credits
        uint256 credits;
    }
    
    /// Survy Category Struct contains all the Category information
    struct survey_category_struct { 
        ///Name of Category
        string name;
        ///Image Link of Category
        string image;
    }
    
    
     /// Trial Struct contains all the trial information
    struct trial_struct { 
        /// The ID of the Trial ID.
        uint256 trial_id;
        /// The ID of the User ID.
        uint256 user_id;
        /// The Image of the Trial
        string image;
        /// The Title of the Trial
        string title;
        /// The Description of the Trial
        string description;
        /// The Contributors of the Trial
        uint256 contributors;
        /// The Audience of the Trial
        uint256 audience;
        /// The Budget of the Trial
        uint256 budget;
        /// The Date of the Trial
        string date;
    }
    
     /// Reward Struct for storing rewared information in the trial 
    struct reward_struct { 
        /// The ID of the Trial ID.
        uint256 trial_id;
        /// The ID of the User ID.
        uint256 user_id;
        /// The Type of the Reward.
        string reward_type;
        /// The Price of the Reward.
        uint256 reward_price;
        /// The Total Spending Limit of the Trial.
        uint256 total_spending_limit;
    }
    
    
    /// Survey Struct contains all the survey information
    struct survey_struct { 
        /// The ID of the Survey ID.
        uint256 survey_id;
        /// The ID of the Trial ID.
        uint256 trial_id;
        /// The ID of the User ID.
        uint256 user_id;
        /// The Name of the Survey
        string name;
        /// The Description of the Survey
        string description;
        /// The Date of the Survey
        string date;
        /// The Image of the Survey
        string image;
        /// The Reward of the Survey
        uint256 reward; 
        /// The Submission of the Survey
        uint256 submission;
    }
     
    /// FHIR user information
    struct fhir_struct {
        /// User ID of the user
        uint256 user_id;
        /// Given Name in FHIR
        string given_name;
        /// Identifier of the user FHIR
        string identifier;
        /// The Patient ID of the user FHIR
        string patient_id;
    }
     
   
   /// OnGoing Trial
   struct ongoing_struct{
       uint256 ongoing_id;
       uint256 trial_id;
       uint256 user_id;
       string date;
   }
   
    /// Question Answers of Survey 
    struct survey_question_answer_struct{
       uint256 answer_id;
       uint256 trial_id;
       uint256 user_id;
       uint256 survey_id;
       uint256 section_id;
       uint256 question_id;
       string answer;
    }
   
    /// Completed Survey Trial
    struct completed_survey_struct{
       uint256 completed_survey_id;
       uint256 trial_id;
       uint256 user_id;
       uint256 survey_id;
       string date;
    }
    
	uint256 public _UserIds;
	uint256 public _TrialIds;
	uint256 public _SurveyIds;
	uint256 public _SurveyCategoryIds;
	
	uint256 public _OngoingIds;
	uint256 public _AnsweredIds;
	uint256 public _CompletedSurveyIds;
	
	 /// The map of all the Users login information.
	mapping(uint256 => user_struct) private _userMap;  
	 /// The map of all the Trials information.
	mapping(uint256 => trial_struct) public _trialMap;  
	 /// The map of all the Rewards information.
	mapping(uint256 => reward_struct) public _trialRewardMap;  
	 /// The map of all the Rewards information.
	mapping(uint256 => string) public _trialAudienceMap;  //trial id => Audience JSON 
	 /// The map of all the Surveys information.
	mapping(uint256 => survey_struct) public _surveyMap;  
	 /// The map of all the Survey Category .
	mapping(uint256 => survey_category_struct) public _categoryMap;  
	 /// The map of all the Survey Sections  .
	mapping(uint256 => string) public _sectionsMap;    //Survey id => All sections
	
	/// The map of all the FHIR information.
	mapping(uint256 => fhir_struct) public _fhirMap;   //User id => user FHIR
	/// The map of all the OnGoing Trials.
	mapping(uint256 => ongoing_struct) public _ongoingMap; 
	/// The map of all the Question Answerd in a Survey.
	mapping(uint256 => survey_question_answer_struct) public _questionanswerdMap; 
	/// The map of all the Completed Surveys.
	mapping(uint256 => completed_survey_struct) public _completedsurveyMap; 
	
	
	
	
	address public owner;


    //Login User
    function CheckEmail(string memory email)
		public 
		view
		returns (string memory )
	{

        ///Getting the found account
		for (uint256 i = 0; i < _UserIds; i++) {
		    	if (
				keccak256(bytes(_userMap[i].email)) ==
				keccak256(bytes(email))
			) {
			    ///Returning user id 
				return Strings.toString(i);
			}
		  
		}

        ///Returning False if not found user
		return "False";
	}


    //CreateAccount
    function CreateAccount(
		string memory full_name,
		string memory email,
		string memory password
	) public   {	
	    
	    // Store the metadata of user in the map.
	    _userMap[_UserIds] = user_struct({
	        user_id: _UserIds,
	        name: full_name,
	        email: email,
	        password: password,
	        image: "https://i.postimg.cc/SsxGw5cZ/person.jpg",
	        credits: 0
	    });
	    _UserIds++;
	}


    //Login User
    function Login(string memory email,string memory password)
		public 
		view
		returns (string memory )
	{

        ///Getting the found account
		for (uint256 i = 0; i < _UserIds; i++) {
		    	if (
				keccak256(bytes(_userMap[i].email)) ==
				keccak256(bytes(email)) &&
				keccak256(bytes(_userMap[i].password)) ==
				keccak256(bytes(password))
			) {
			    ///Returning user id 
				return Strings.toString(i);
			}
		  
		}

        ///Returning False if not found user
		return "False";
	}

    
    //Create Trial
    function CreateTrial(uint256 user_id, string memory image,string memory title, string memory description, uint256 contributors, uint256 audience, uint256 budget, string memory date) public{
        // Store the metadata of Trial in the map.
	    _trialMap[_TrialIds] = trial_struct({
	         trial_id:_TrialIds,
	         user_id: user_id,
	         image: image,
	         title: title,
	         description: description,
	         contributors: contributors,
	         audience: audience,
	         budget: budget,
	         date: date
	    });
	    
	    // Store the metadata of Reward in the map.
	    _trialRewardMap[_TrialIds] = reward_struct({
	         trial_id:_TrialIds,
	         user_id: user_id,
	         reward_type: "",
	         reward_price: 0,
	         total_spending_limit: budget
	    });
	    _TrialIds++;
    }

  
  
    //Create Survey
    function CreateSurvey(uint256 trial_id,uint256 user_id,string memory name,string memory description,string memory date,string memory image,uint256 reward) public{
        // Store the metadata of Survey in the map.
	    _surveyMap[_SurveyIds] = survey_struct({
	         survey_id:_SurveyIds,
	         trial_id:trial_id,
	         user_id: user_id,
	         name: name,
	         description: description,
	         date: date,
	         image: image,
	         reward: reward,
	         submission: 0
	    });
	    _SurveyIds++;
    }
    //Create or Save Sections
    function CreateOrSaveSections(uint256 survey_id, string memory metadata) public{
        // Store the metadata of all Sections in the map.
	    _sectionsMap[survey_id] = metadata;
    }
   //Create Survey Category
    function CreateSurveyCategory(string memory name,string memory image) public{
        // Store the metadata of Survey Category in the map.
	    _categoryMap[_SurveyCategoryIds] = survey_category_struct({
	         name:name,
	         image:image
	    });
	    _SurveyCategoryIds++;
    }


    //Get All Survey by Trial ID
    function getAllSurveysIDByTrial(uint256 trial_id) public view  returns (uint256[] memory) {
        uint256 _TemporarySearch = 0;

        for (uint256 i = 0; i < _SurveyIds; i++) {
            if (_surveyMap[i].trial_id ==trial_id) {
                _TemporarySearch++;
            }
        }
        uint256[] memory _SearchedStore = new uint256[](_TemporarySearch);

        uint256 _SearchIds2 = 0;

        for (uint256 i = 0; i < _SurveyIds; i++) {
              if (_surveyMap[i].trial_id ==trial_id) {
                _SearchedStore[_SearchIds2] = i;
                _SearchIds2++;
            }
        }

        return _SearchedStore;
    }
  
      //Get UserDetails by userid
    function getUserDetails(uint256 user_id) public view  returns (string memory, uint256,string memory,string memory) {
        return (_userMap[user_id].image, _userMap[user_id].credits, _userMap[user_id].name, _userMap[user_id].email);
    }
  

    //Update Trial
    function UpdateTrial(uint256 trial_id, string memory image,string memory title, string memory description, uint256 budget) public{
        // Update the metadata of Trial in the map.
	    _trialMap[trial_id].image = image;
	    _trialMap[trial_id].title = title;
	    _trialMap[trial_id].description = description;
	    _trialMap[trial_id].budget = budget;
	    
    }
    

    //Update Survey
    function UpdateSurvey(uint256 survey_id,string memory name,string memory description,string memory image,uint256 reward) public{
        // Update the metadata of Survey in the map.
	    _surveyMap[survey_id].name = name;
	    _surveyMap[survey_id].description = description;
	    _surveyMap[survey_id].image = image;
	    _surveyMap[survey_id].reward = reward;
    }
  
    //Update Reward
    function UpdateReward(uint256 trial_id, 
        string memory reward_type,
        uint256 reward_price,
        uint256 total_spending_limit
    ) public{
        // Update the metadata of Trial in the map.
	    _trialRewardMap[trial_id].reward_type = reward_type;
	    _trialRewardMap[trial_id].reward_price = reward_price;
	    _trialRewardMap[trial_id].total_spending_limit = total_spending_limit;
    }
   
    
     //Update Audience
    function UpdateAudience(uint256 trial_id, 
        string memory audience_info
    ) public{
        // Update the metadata of Audience in the map.
	    _trialAudienceMap[trial_id] = audience_info;
	    
    }
   
   
      //Update User
    function UpdateUser(uint256 user_id,string memory image,uint256 credits) public{
        // Update the metadata of User in the map
	    _userMap[user_id].image = image;
	    _userMap[user_id].credits = credits;
    }

   
    //Update FHIR
    function UpdateFhir(uint256 user_id,string memory given_name,string memory identifier,string memory patient_id) public{
        // Update the metadata of FHIR in the map.
        _fhirMap[user_id].user_id = user_id;
	    _fhirMap[user_id].given_name = given_name;
	    _fhirMap[user_id].identifier = identifier;
	    _fhirMap[user_id].patient_id = patient_id;
    }


    function CreateOngoingTrail(uint256 trial_id,uint256 user_id, string memory date) public{
        // Store the metadata of Ongoing Trial in the map.
	    _ongoingMap[_OngoingIds] = ongoing_struct({
	        ongoing_id:_OngoingIds,
            trial_id:trial_id,
            user_id:user_id,
            date: date
	    });
	    _trialMap[trial_id].contributors += 1;
	    _OngoingIds++;
    }
    
    function GetOngoingTrial(uint256 user_id) public view returns (string memory ){
        ///Getting the found Ongoing Trial
		for (uint256 i = 0; i < _OngoingIds; i++) {
		    if (_ongoingMap[i].user_id == user_id) {
			    ///Returning Trial id 
				return Strings.toString(_ongoingMap[i].trial_id);
			}
		}
        ///Returning False if not found 
		return "False";
    }

//     function GetQuestionAnswers(uint256 trial_id,uint256 survey_id,uint256 question_id) public view returns (string memory ){
//         ///Getting the found Ongoing Trial
// 		for (uint256 i = 0; i < _OngoingIds; i++) {
// 		    if (_ongoingMap[i].user_id == user_id) {
// 			    ///Returning Trial id 
// 				return Strings.toString(_ongoingMap[i].trial_id);
// 			}
// 		}
//         ///Returning False if not found 
// 		return "False";
//     }
    function CreateQuestionAnswer(  uint256 trial_id,uint256 user_id,uint256 survey_id,uint256 section_id,uint256 question_id,string memory answer) public{
        // Store the metadata of Question Answered in the map.
	    _questionanswerdMap[_AnsweredIds] = survey_question_answer_struct({
            answer_id:_AnsweredIds,
            trial_id:trial_id,
            user_id:user_id,
            survey_id:survey_id,
            section_id:section_id,
            question_id:question_id,
            answer:answer
        });
	    _AnsweredIds++;
    }

    function CreateCompletedSurveys(uint256 survey_id,uint256 user_id,string memory date,uint256 trial_id) public{
        // Store the metadata of Completed Survyes in the map.
	    _completedsurveyMap[_CompletedSurveyIds] = completed_survey_struct({
	        completed_survey_id:_CompletedSurveyIds,
            trial_id:trial_id,
            user_id:user_id,
            survey_id: survey_id,
            date: date
	    });
	    _surveyMap[survey_id].submission += 1;
	    _surveyMap[survey_id].date = date;
	    _CompletedSurveyIds++;
    }
    
    function getAllCompletedSurveysIDByUser(uint256 user_id) public view  returns (uint256[] memory) {
        uint256 _TemporarySearch = 0;

        for (uint256 i = 0; i < _CompletedSurveyIds; i++) {
            if (_completedsurveyMap[i].user_id ==user_id) {
                _TemporarySearch++;
            }
        }
        uint256[] memory _SearchedStore = new uint256[](_TemporarySearch);

        uint256 _SearchIds2 = 0;

        for (uint256 i = 0; i < _CompletedSurveyIds; i++) {
              if (_completedsurveyMap[i].user_id ==user_id) {
                _SearchedStore[_SearchIds2] = i;
                _SearchIds2++;
            }
        }

        return _SearchedStore;
    }
    
    
    
    
    function reset_all() public {
    for (uint256 i = 0; i < _UserIds; i++)            delete _userMap[i];
    for (uint256 i = 0; i < _TrialIds; i++)           delete _trialMap[i];
    for (uint256 i = 0; i < _TrialIds; i++)           delete _trialRewardMap[i];
    for (uint256 i = 0; i < _TrialIds; i++)           delete _trialAudienceMap[i];
    for (uint256 i = 0; i < _SurveyIds; i++)          delete _surveyMap[i];
    for (uint256 i = 0; i < _SurveyCategoryIds; i++)  delete _categoryMap[i];
    for (uint256 i = 0; i < _TrialIds; i++)           delete _sectionsMap[i];    
    for (uint256 i = 0; i < _UserIds; i++)     		  delete _fhirMap[i];      
    for (uint256 i = 0; i < _OngoingIds; i++)         delete _ongoingMap[i];      
    for (uint256 i = 0; i < _AnsweredIds; i++)        delete _questionanswerdMap[i];      
    for (uint256 i = 0; i < _CompletedSurveyIds; i++) delete _completedsurveyMap[i];      
    _UserIds = 0;
    _TrialIds = 0;
    _SurveyIds = 0;
    _SurveyCategoryIds = 0;
    _OngoingIds = 0;
    _AnsweredIds = 0;
    _CompletedSurveyIds = 0;
    

    }

}


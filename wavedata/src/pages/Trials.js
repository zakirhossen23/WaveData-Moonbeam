import { PlusSmIcon, ArrowRightIcon, UserIcon, CurrencyDollarIcon, GlobeAltIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useContract from '../services/useContract'
import CreateTrialModal from '../components/modal/CrateTrial'
import './Trial.css'

let isLoadingData = false;
function Trials() {
   const navigate = useNavigate();
   const [data, setData] = useState([]);
   const [CreatemodalShow, setModalShow] = useState(false);
   const [Loading, setLoading] = useState(true);
   const addTrial = () => {
      setModalShow(true);
   };
   const { contract, signerAddress } = useContract();
   const [screenSize, getDimension] = useState({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
    
   async function LoadData() {
      if (!isLoadingData && contract !== null) {
         isLoadingData = true;
         setLoading(true);
         setData([])
         for (let i = 0; i < Number(await contract._TrialIds().call()); i++) {
            let trial_element = await contract._trialMap(i).call();
            let allAudiences = [];
            try {
               allAudiences = JSON.parse(await contract._trialAudienceMap(i).call());
            } catch (e) {}
            var newTrial = {
               id: Number(trial_element.trial_id),
               title: trial_element.title,
               image: trial_element.image,
               description: trial_element.description,
               contributors: Number(trial_element.contributors),
               audience: Number(allAudiences.length),
               budget: Number(trial_element.budget)
            };
            setData(prevState => [...prevState, newTrial]);
         }

         isLoadingData = false;
      }
      setLoading(false);

   }

   useEffect(() => {
      const setDimension = () => {
         getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight
          })
       }
    

      window.addEventListener('resize', setDimension);
      LoadData();
   }, [contract])

   return (
      <>
         <div className="bg-white border border-gray-400 rounded-lg py-4 px-6 flex mb-2 items-center">
            <h1 className="text-2xl m-0  font-semibold flex-1 text-gray-500">Medical trials</h1>
            <button onClick={addTrial} className="h-10 rounded-md shadow-md bg-black text-white flex py-2 px-4 items-center">
               <PlusSmIcon className="w-5 h-5 text-white" />
               <p className="text-white ml-2">Trial</p>
            </button>
         </div>
         {data.length !== 0 ? (<>
            {data.map(({ id, title, image, description, contributors, audience, budget }, index) => {
               const IS_LAST = index + 1 === data.length;
               return (
                  <div key={index} className={`bg-white border border-gray-400 rounded-lg trial-container overflow-hidden ${!IS_LAST && 'mb-2'}`}>
                     <div className="flex p-6">
                        <img src={image} alt="Trial" className="w-[128px] h-[128px] object-cover max-w-xs" />
                        <div className="mx-8 flex-1">
                           <p className="text-xl font-semibold">{title}</p>
                           <p className="mt-6">{`${screenSize.dynamicWidth < 800 ?description.slice(0, 100):description.slice(0, 180)}...`}</p>
                        </div>
                        <button onClick={() => window.location.href = (`/trials/${id}`)} className="flex w-[52px] h-10 border border-gray-400 bg-gray-200 rounded-md justify-center items-center">
                           <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                     </div>
                     <div className="flex p-6 border-t border-t-gray-400 bg-gray-200">
                        <div className="flex items-center">
                           <UserIcon className="w-5 h-5 text-gray-500" />
                           {(screenSize.dynamicWidth > 760) ? (<>
                           <p className="text-gray-500 font-semibold ml-1">{`${contributors} contributor(s)`}</p></>) :
                     (<><p className="text-gray-500 font-semibold ml-1">{`${contributors}`}</p></>)}
                        </div>
                        <div className="flex items-center ml-6">
                           <GlobeAltIcon className="w-5 h-5 text-gray-500" />
                           {(screenSize.dynamicWidth > 760) ? (<>
                           <p className="text-gray-500 font-semibold ml-1">{`${audience} audience(s)`}</p></>) :
                     (<><p className="text-gray-500 font-semibold ml-1">{`${audience}`}</p></>)}
                        </div>
                        <div className="flex items-center ml-6">
                           <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
                           {(screenSize.dynamicWidth > 760) ? (<>
                           <p className="text-gray-500 font-semibold ml-1">{`Budget of TEVMOS ${budget}`}</p></>) :
                     (<><p className="text-gray-500 font-semibold ml-1">{`TEVMOS ${budget}`}</p></>)}
                        </div>
                     </div>
                  </div>
               );
            })}
         </>) : (Loading == true ? (<>
            <p className="alert alert-info font-semibold text-3xl text-center">Loading...</p>
         </>) : (<><p className="alert alert-info font-semibold text-3xl text-center">No Trials</p></>))
         }
         <CreateTrialModal
            show={CreatemodalShow}
            onHide={() => {
               setModalShow(false);
               LoadData()
            }}
         />
      </>
   );
}

export default Trials;

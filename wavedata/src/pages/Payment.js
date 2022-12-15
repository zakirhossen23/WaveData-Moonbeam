import { useState, useEffect } from "react";
import useContract from '../services/useContract'
function Payment() {
   const [tabIndex, setTabIndex] = useState(0);
   const { contract, signerAddress } = useContract();
   const TABS = [
      {
         id: 'transactions',
         title: 'Transactions',
      },
      {
         id: 'paymentmethod',
         title: 'Payment method',
      }
   ];
   const [screenSize, getDimension] = useState({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
   });

   useEffect(async () => {
      const setDimension = () => {
         getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight
         })
      }

      window.addEventListener('resize', setDimension);
   }, [contract])


   return (
      <>
         <div className="bg-white border border-gray-400 rounded-lg flex mt-4 px-4">
            {TABS.map(({ id, title }, index) => {
               const IS_LAST = index === TABS.length - 1;
               const ACTIVE = index === tabIndex;

               return (
                  <>
                     <div className="self-stretch w-[1px] bg-gray-400" />
                     <button key={id} onClick={() => setTabIndex(index)} className={`flex items-center h-14 p-4 ${ACTIVE ? 'bg-gray-100' : 'bg-white'}`}>
                        <p className={`${ACTIVE ? 'text-orange-500' : 'text-black'} font-medium`}>{title}</p>
                     </button>
                     {IS_LAST && <div className="self-stretch w-[1px] bg-gray-400" />}
                  </>
               );
            })}
         </div>
         {tabIndex === 0 && (
            <div className="bg-white border border-gray-400 rounded-lg py-4 px-6 flex flex-col mt-4">
               <h2 className="m-0">Transactions</h2>
               <table className="table-responsive-xl">
                  <thead className="border-b border-b-gray-400">
                     <tr>
                        <th className="text-left font-normal py-3 px-3">Date</th>
                        <th className="text-left font-normal py-3 px-3">Description</th>
                        <th className="text-left font-normal py-3 px-3 w-56">Status</th>
                        <th className="text-left font-normal py-3 px-3 w-32">Amount</th>
                     </tr>
                  </thead>
               </table>
            </div>
         )}
         {tabIndex === 1 && (
            <div className="bg-white border border-gray-400 rounded-lg py-4 px-6 flex flex-col mt-4">
               <h2 className="mb-3">Payment</h2>
               <div className="mb-2 ">
                  <label className="flex flex-col font-semibold mt-1 ">
                     Card number
                     <input type="text" className="mt-1 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400 " placeholder="0000 0000 0000 0000" />
                  </label>
               </div>
               <div className={`flex items-center justify-between items-end ${screenSize.dynamicWidth < 800? "flex-wrap":""}`}>
                  <label className="flex flex-col font-semibold mt-1" style={{width: '30rem'}}>
                     CVV number
                     <input type="text" className="mt-1 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400 " placeholder="000" />
                  </label>
                  <label className="flex flex-col font-semibold mt-1 w-56">
                     Expiry date
                     <input type="text" className="mt-1 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400 " placeholder="00" />
                  </label>
                  <div className="h-full text-2xl pt-8">
                  /
                  </div>
                  
                  <label className="flex flex-col pt-6  font-semibold mt-1 w-56">
                     <input type="text" className=" mt-2 h-10 border border-gray-200 rounded-md outline-none px-2 focus:border-gray-400 " placeholder="00" />
                  </label>
               </div>


            </div>
         )}

      </>
   );
}

export default Payment;


import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import useContract from '../../services/useContract'
function ResetAll() {
   let navigate = useNavigate();
   const { contract, signerAddress, fD } = useContract();

   async function ResetClick(event) {
      event.target.disabled = true;
      await contract.reset_all().send({
         from:window.ethereum.selectedAddress,
         gasPrice: 100_000_000,
         gas: 6_000_000,
      });

      window.location.href="/";

      event.target.disabled = false;

   }

   return (
      <div className="min-h-screen grid-cols-2 flex">

         <div className="bg-white flex-1 flex flex-col justify-center items-center">
            <div className="pl-20 pr-20 relative container-panel">
               <h1 className="text-4xl font-semibold mt-10 text-center">Reset All Data.</h1>


               <div className="mt-10">
                  <button onClick={ResetClick} className="bg-gray-200 text-gray-500 rounded-md shadow-md h-10 w-full mt-3 hover:bg-black transition-colors">
                     Reset
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ResetAll;

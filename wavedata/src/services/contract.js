import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ERC721Singleton from './ERC721Singleton';

// Initializing contract
async function initContract() {
  try {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        window.accountId = window.ethereum.selectedAddress;
        window.contract = await ERC721Singleton(signer);
      } catch (error) {
        console.error(error);
      }
    };  
    fetchData();
  } catch (error) {
    console.error(error)
  }
 
}

if (typeof window !== "undefined") {
  if (window?.ethereum !== "undefined")
  window.InitPromise = initContract()  
}
// export default null;
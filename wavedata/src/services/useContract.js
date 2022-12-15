import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import ERC721Singleton from './ERC721Singleton';

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = { contract: null, signerAddress: null };

				contract.contract = ERC721Singleton(signer);

				contract.signerAddress = await signer.getAddress();
				window.contract = contract.contract;
				setContractInstance(contract);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return contractInstance;
}
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import erc721 from "../contracts/deployments/moonbase/WaveData.json";
import InterChainABI from "./InterChainABI.json";
import ERC721Singleton from "./ERC721Singleton";
import chains from "./chains.json";
import {HyperlaneCore, MultiProvider, chainConnectionConfigs} from "@hyperlane-xyz/sdk";

export default function useContract() {
	const [contractInstance, setContractInstance] = useState({
		contract: null,
		signerAddress: null,
		sendTransaction: sendTransaction,
		currentChain: null
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = {contract: null, signerAddress: null, sendTransaction: sendTransaction, currentChain: null};

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

	async function sendTransaction(methodWithSignature) {
		if (Number(window.ethereum.networkVersion) === 1287) {
			//If it is sending from Moonbase then it will not use bridge
			await methodWithSignature.send({
				from: window.ethereum.selectedAddress,
				gasPrice: 10_000_000_000
			});
			return;
		}
		let encoded = methodWithSignature.encodeABI();
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		var domain_id = 0x6d6f2d61; //Moonbase alpha Domain ID where main contract is deployed

		const multiProvider = new MultiProvider({
			alfajores: chainConnectionConfigs.alfajores,
			bsctestnet: chainConnectionConfigs.bsctestnet,
			goerli: chainConnectionConfigs.goerli,
			moonbasealpha: chainConnectionConfigs.moonbasealpha
		});

		const core = HyperlaneCore.fromEnvironment("testnet2", multiProvider);

		const InterChaincontract = new ethers.Contract(InterChainABI.address, InterChainABI.abi, signer);
		const tx = await InterChaincontract["dispatch(uint32,(address,bytes)[])"](domain_id, [[erc721.address, encoded]]);
		const reciept = await tx.wait();
		await core.waitForMessageProcessing(reciept);
	}

	return contractInstance;
}

export function getChain(chainid) {
	for (let i = 0; i < chains.allchains.length; i++) {
		const element = chains.allchains[i]
		if (element.chainId === chainid) {
			return element
		}
	}
	return chains.allchains[0];
}
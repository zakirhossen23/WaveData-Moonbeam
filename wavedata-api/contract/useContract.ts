import { ethers } from 'ethers';
import erc721 from './deployments/evmos/WaveData.json';
import Web3 from 'web3';
export default async function useContract() {

	let contractInstance = {
		contract: null,
		signerAddress: null,
		nonce: 0
	}
	
	let private_key = "fb57cdb52c16a26a9f54d37ce8f106bc4a334772d5c376c08f009e042cb0a7fe";
	let provider_url = "https://eth.bd.evmos.dev:8545";
	const provider = new ethers.providers.JsonRpcProvider(provider_url);
	const signer = new ethers.Wallet(private_key,provider)
	const contract = new ethers.Contract(erc721.address, erc721.abi, signer)
	 
	// const web3 = new Web3(provider_url)

	// const signerWeb = await web3.eth.accounts.wallet.add(private_key); //Adding private key
	// const contract = new web3.eth.Contract(erc721.abi as any, erc721.address).methods

	contractInstance.signerAddress = signer.address as any;
	contractInstance.contract =contract as any;
	contractInstance.nonce = await provider.getTransactionCount(contractInstance.signerAddress as any, "pending") as any;

	return contractInstance;
}
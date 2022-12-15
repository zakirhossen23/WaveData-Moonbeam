import Web3 from 'web3'

import erc721 from './deployments/evmos/WaveData.json';

export default async function ERC721Singleton(provider,private_key) {
	let web3 = null;
	web3 = new Web3(provider);
	web3.eth.accounts.wallet.add(private_key); //Adding private key
	// create an instance of the KeyManager
	const myKM = new web3.eth.Contract(erc721.abi, erc721.address).methods

	return myKM
}
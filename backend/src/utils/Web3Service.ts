import HDWalletProvider from '@truffle/hdwallet-provider';
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import Web3 from 'web3';
import { abi } from './contract';

// endpoints
const endpoint = "https://polygon-rpc.com/";
// const endpoint = "https://goerli.infura.io/v3/fee8917ab09e4e409ada6f602b288672";

const WALLET_WORDS = process.env.WALLET_WORDS || '';
const provider = new HDWalletProvider(WALLET_WORDS, endpoint);

// polygon fixes nonce issues
const nonceTracker = new NonceTrackerSubprovider()
provider.engine['_providers'].unshift(nonceTracker)
nonceTracker.setEngine(provider.engine)

// web3 instance
const web3 = new Web3(provider as any);
const contract = new web3.eth.Contract(abi as any, process.env.CONTRACT_ADDRESS);
const no_wallet_web3 = new Web3(endpoint);

const collect_nft = async (address: string, nft_id: number) =>
{
    
}

const validate_wallet = async (address: string, nft_id: number) =>
{
    
}

const redeem_nft = async (address: string, nft_id: number) =>
{
    
}

export {
    no_wallet_web3,
    collect_nft,
    validate_wallet,
    redeem_nft,
}

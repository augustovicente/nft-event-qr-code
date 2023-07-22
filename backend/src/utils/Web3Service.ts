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
    let gasPrice = await web3.eth.getGasPrice();
    return await contract.methods.collectNFT(address, nft_id)
        .send({
            from: provider.getAddress(0),
            gasPrice: gasPrice,
        });
}

type validate_wallet_result = 'not-found' | 'already-redeemed' | true;

async function validate_wallet(address: string, nft_id: number): Promise<validate_wallet_result> {
    const hasNFT = await contract.methods.checkHasNFT(address, nft_id).call();
    if (!hasNFT) return 'not-found';
    const isRedeemed = await contract.methods.checkIsRedeemed(address, nft_id).call();
    if (isRedeemed) return 'already-redeemed';
    return true;
}

type validate_collect_result = 'has-item' | 'already-collected' | true;

async function validate_collect(address: string, nft_id: number): Promise<validate_collect_result> {
    const hasCollected = await contract.methods.checkHasNFT(address, nft_id).call();
    if (!hasCollected) return 'already-collected';
    const availableCount = await contract.methods.checkAvailableNFT(nft_id).call();
    if (+availableCount === 0) return 'has-item';
    return true;
}

const redeem_nft = async (address: string, nft_id: number) =>
{
    let gasPrice = await web3.eth.getGasPrice();
    return await contract.methods.useNFT(address, nft_id)
        .send({
            from: provider.getAddress(0),
            gasPrice: gasPrice,
        });
}

export {
    no_wallet_web3,
    collect_nft,
    validate_wallet,
    redeem_nft,
    validate_collect,
}

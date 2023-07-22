import { api } from "services/api";
import Web3 from "web3";
import { abi, contract_address } from "./contract";

const _window: any = window as any;
const provider: any = _window.ethereum;
export const web3 = new Web3(provider);
const polygonNetworkId = '137'

export const checkWallet = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (provider) {
            web3.eth.net.getId()
                .then((networkId) => {
                    if (String(networkId) !== polygonNetworkId) return resolve('disconnect')
                    else {
                        return resolve('connected')
                    }
                })
                .catch(err => reject('disconnect'))
        } else {
            return resolve('disconnect')
        }
    })
}

const add_polygon_network = (): Promise<any> => {
    return _window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: web3.utils.toHex(polygonNetworkId),
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        }],
    })
}

const request_wallet = (): Promise<any> => {
    return _window.ethereum.request({ method: 'eth_requestAccounts' })
}

const switch_to_polygon = (): Promise<any> => {
    return _window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{
            chainId: web3.utils.toHex(polygonNetworkId)
        }]
    })
}

export const connect: () => Promise<string[]> = () => {
    return new Promise((resolve, reject) => {
        if (_window.ethereum && _window.ethereum.isMetaMask) {
            // check if user has polygon network added to metamask

            web3.eth.net.getId()
                .then((networkId) => {
                    if (String(networkId) !== polygonNetworkId) {
                        // request to user polygon network
                        switch_to_polygon()
                            .then((res) => {
                                // request to user connect wallet
                                request_wallet()
                                    .then((accounts: string[]) => {
                                        api.post('vinculate-wallet', {
                                            wallet: accounts[0]
                                            })
                                            .then()
                                        return resolve(accounts);
                                    })
                                    .catch((err) => {
                                        console.log('err', err)
                                        reject(err)
                                    })
                            })
                            .catch((err: any) => {
                                if (err?.message === 'User rejected the request.') return reject(err);

                                add_polygon_network()
                                    .then((res) => {
                                        resolve(res)
                                    })
                                    .catch((err) => {
                                        reject(err)
                                    })
                            })
                    } else {
                        // request to user connect wallet
                        request_wallet()
                            .then((accounts: string[]) => {
                                return resolve(accounts);
                            })
                            .catch((err) => {
                                console.log('err', err)
                                reject(err)
                            })
                    }
                })
        } else {
            reject({ error: 'Metamask not installed' });
        }
    })
}

export const get_contract = async (): Promise<any> => {
    const nftContract = new web3.eth.Contract(abi as any, contract_address);
    return nftContract;
}

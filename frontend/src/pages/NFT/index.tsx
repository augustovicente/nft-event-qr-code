import { ByCapitel } from "components/ByCapitel/ByCapitel";
import { NFTContainer } from "./styles";
import { useEffect, useState } from "react";
import { api } from "services/api";
import Modal from 'react-modal';
import { FeedbackModal } from "components/FeedbackModal/FeedbackModal";
import { connect, get_contract } from "services/web3";
import { useParams } from "react-router-dom";
import axios from "axios";

type ModalProps = {
    isOpen: boolean;
    text: string;
}

export const NFT = () => {
    Modal.setAppElement('#root');
    const { nft_id } = useParams();

    const [successModal, setSuccessModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [loadingModal, setLoadingModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [errorModal, setErrorModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [metamaskModal, setMetamaskModal] = useState<boolean>(false);
    const [nft, setNft] = useState<any>({});
    const [isCollected, setIsCollected] = useState<boolean>(false);
    const [wallet, setWallet] = useState<string>('');

    const handleCollect = async () => {
        if (isCollected) return;

        let _wallet = wallet;
        if (!wallet) {
            const wallets = await connect();
            if (!wallets) return;
            _wallet = wallets[0];
        }

        setLoadingModal({
            isOpen: true,
            text: 'Enviando Colecionável',
        });
        api.post('/collect-nft', { wallet: _wallet, nft_id: nft.id }).then((response) => {                
            if (response.data.error)
            {
                switch (response.data.error)
                {
                    case 'item-sold-out':
                        setErrorModal({
                            isOpen: true,
                            text: 'Colecionável Esgotado!',
                        });
                        break;
                    case 'item-already-collected':
                        setErrorModal({
                            isOpen: true,
                            text: 'Colecionável já coletado!',
                        });
                        break;

                }
            }
            else if (response.data.success)
            {
                setSuccessModal({
                    isOpen: true,
                    text: 'Colecionável enviado com sucesso!',
                });
                setIsCollected(true);
            }
        })
        .catch((error) => {
            console.error(error);
            setErrorModal({
                isOpen: true,
                text: 'Erro na requisição',
            });
        })
        .finally(() => {
            setLoadingModal({
                isOpen: false,
                text: '',
            });
        });
    };

    useEffect(() => {
        if(!nft_id) return;

        if (!wallet) {
            connect().then((wallets) => {
                if (!wallets) return;
                setWallet(wallets[0]);
            }).catch((error) => {
                console.error(error);
                setMetamaskModal(true);
                return;
            });
        }

        axios.get(`/nfts/metadata.json`).then(({ data }) => {
            const nft_metadata = data[nft_id];
            if(!nft_metadata)
            {
                window.location.href = '/404';
            }
            setNft(nft_metadata);
        });

        getNFTAmounts();
    }, []);

    const checkHasNFT = async () => {
        if (wallet) {
            const contract = await get_contract();
            const hasNFT = await contract.methods.checkHasNFT(wallet, nft_id).call()
            setIsCollected(!!hasNFT);
        }
    };

    const getNFTAmounts = async () => {
        const contract = await get_contract();
        const available = Number(await contract.methods.checkAvailableNFT(nft_id).call());
        const total = Number(await contract.methods.checkTotalNFTs(nft_id).call());
        setNft((_nft: any) => ({ ..._nft, available, total }));
    };

    useEffect(() => {
        checkHasNFT();
    }, [wallet]);

    return (
        <NFTContainer>
            <img
                alt="Background Redeem Page"
                src="/imgs/redeem-background.png"
                className="background"
            />
            <img
                src="/imgs/hacktown.png" 
                alt="Hacktown Logo"
                className="hacktown"
            />
            <div className="nft-content">
                <div className="header">
                    <img
                        className="nft-image"
                        src={`/nfts/${nft.id}.png`}
                        alt="NFT Image"
                    />
                    {!isCollected && nft.available && nft.total && (<span className="amount">
                        {nft.available}/{nft.total}
                    </span>)}
                </div>
                <div className="body">
                    <div className="title-container">
                        <span>{nft.id} - {nft.name}</span>
                    </div>
                    <div className="prize-container">
                        <i className="ph ph-sketch-logo"></i>
                        <span>
                            <b>Prêmio: </b>{nft.prize}
                        </span>
                    </div>
                    <div className="location-container">
                        <i className="ph ph-map-pin-line"></i>
                        <div className="place">
                            <span><b>{nft.place_name}</b></span>
                            <span><b>Localidade:</b>{nft.place_address}</span>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button
                        onClick={handleCollect}
                        className={'collect ' + (isCollected ? 'collected' : '')}
                        >
                        {isCollected ? 'Coletado' : 'Coletar'}
                    </button>
                    <ByCapitel theme="light"/>
                </div>
            </div>

            <Modal
                isOpen={loadingModal.isOpen}
                className={'scan-modal'}
            >
                <FeedbackModal text={loadingModal.text} type="loading" />
            </Modal>

            <Modal
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => {
                    setErrorModal({
                        isOpen: false,
                        text: '',
                    });
                }}
                isOpen={errorModal.isOpen}
                className={'scan-modal'}
            >
                <FeedbackModal text={errorModal.text} type="error" />
            </Modal>

            <Modal
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => {
                    setSuccessModal({
                        isOpen: false,
                        text: '',
                    });
                }}
                isOpen={successModal.isOpen}
                className={'scan-modal'}
            >
                <FeedbackModal text={successModal.text} type="success" />
            </Modal>

            <Modal
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => {
                    setMetamaskModal(false);
                    window.open('https://metamask.app.link/dapp/mysticker.io/', '_blank');
                }}
                isOpen={metamaskModal}
                className={'scan-modal'}
            >
                <FeedbackModal
                    custom_img="/imgs/metamask.png"
                    text={'Instale o MetaMask para continuar'}
                    type="success"
                />
            </Modal>
        </NFTContainer>
    );
};

import { ByCapitel } from "components/ByCapitel/ByCapitel";
import { NFTContainer } from "./styles";
import { useState } from "react";
import { api } from "services/api";
import Modal from 'react-modal';
import { FeedbackModal } from "components/FeedbackModal/FeedbackModal";
import { connect } from "services/web3";

type ModalProps = {
    isOpen: boolean;
    text: string;
}

export const NFT = () => {
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
        if (!wallet) {
            let wallets;
            try {
                wallets = await connect()
            } catch (error) {
                console.error(error);
                setMetamaskModal(true);
                return;
            }

            if (!wallets) return;
            setWallet(wallets[0]);
        }

        setLoadingModal({
            isOpen: true,
            text: 'Enviando Colecionável',
        });
        api.post('/colect-nft', { wallet: wallet, nft_id: nft.id }).then((response) => {                
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
                        src="https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fwww.arweave.net%2FicA7vfsZ9Uhw70qbpkZ2vyrQTyuePW67x-xHOMsWF78%3Fext%3Dpng&w=3840&q=75"
                        alt="NFT Image"
                    />
                    {!isCollected && (<span className="amount">
                        01/06
                    </span>)}
                </div>
                <div className="body">
                    <div className="title-container">
                        <span>{nft.id}1 - {nft.name} kandkansd</span>
                    </div>
                    <div className="prize-container">
                        <i className="ph ph-sketch-logo"></i>
                        <span>
                            <b>Prêmio: </b>{nft.prize}PREIMAO
                        </span>
                    </div>
                    <div className="location-container">
                        <i className="ph ph-map-pin-line"></i>
                        <div className="place">
                            <span><b>{nft.place_name}NOME KKK</b></span>
                            <span><b>Localidade:</b> SALVE {nft.place_address}</span>
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

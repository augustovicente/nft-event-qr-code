import { useEffect, useState } from "react";
import { QRCodeScanConteiner } from "./styles"
import { QrReader } from 'react-qr-reader';
import Modal from 'react-modal';
import { api } from "services/api";
import { FeedbackModal } from "../../components/FeedbackModal/FeedbackModal";
import { ItemFound } from "./components/ItemFound";
import { useAuth } from "contexts/auth.context";

type ModalProps = {
    isOpen: boolean;
    text: string;
}

export const QRCodeScan = () =>
{
    const { signOut } = useAuth();
    const [data, setData] = useState<string | null>(null);
    const [isReading, setIsReading] = useState<boolean>(false);

    const [loadingModal, setLoadingModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [errorModal, setErrorModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [successModal, setSuccessModal] = useState<ModalProps>({
        isOpen: false,
        text: '',
    });

    const [itemModal, setItemModal] = useState({
        isOpen: false,
        itemUrl: '',
        itemId: 1,
    });

    Modal.setAppElement('#root');

    useEffect(() => {
        console.log(data);
        if (data)
        {
            setIsReading(false);
            setLoadingModal({
                isOpen: true,
                text: 'Lendo Carteira',
            });
            api.post('/validate-wallet', { wallet: data }).then((response) => {                
                if (response.data.error)
                {
                    switch (response.data.error)
                    {
                        case 'wallet-not-valid':
                            setErrorModal({
                                isOpen: true,
                                text: 'Carteira inválida',
                            });
                            break;
                        case 'item-already-redeemed':
                            setErrorModal({
                                isOpen: true,
                                text: 'Item já resgatado',
                            });
                            break;
                        case 'item-not-found-in-wallet':
                            setErrorModal({
                                isOpen: true,
                                text: 'Colecionável não encontrado na carteira',
                            });
                            break;
                    }
                }
                else if (response.data.success)
                {
                    setItemModal({
                        isOpen: true,
                        itemUrl: `/imgs/nfts/${response.data.data.item_id}.png`,
                        itemId: response.data.data.item_id,
                    });
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
        }
    }, [data]);

    const handleRedeemItem = () => {
        setLoadingModal({
            isOpen: true,
            text: 'Resgatando Item',
        });
        api.post('/redeem-nft', { wallet: data }).then((response) => {
            if(response.data.success)
            {
                setSuccessModal({
                    isOpen: true,
                    text: 'Resgate realizado com sucesso',
                });
            }
        })
        .catch((error) => {
            console.error(error);
            setErrorModal({
                isOpen: true,
                text: 'Erro na requisição de resgate',
            });
        })
        .finally(() => {
            setLoadingModal({
                isOpen: false,
                text: '',
            });
        });
    }

    const resetPage = () => {
        window.location.reload();
    }

    return (
        <QRCodeScanConteiner>
            <img className="background" src="imgs/background.png" alt="Background QR Scanner" />
            <div className="qr-content">
                <img className="logo" src="imgs/hacktown.png" alt="Hacktown Logo" />
                {isReading ? (
                    <QrReader
                        onResult={(result, error) => {
                            if (error)
                            {
                                console.info(error);
                            }
                            else if (result && result?.text && result?.text !== data)
                            {
                                setData(result?.text);
                            }
                        }}
                        scanDelay={1000}
                        videoContainerStyle={{ 
                            paddingTop: '0px',
                            display: 'flex',
                        }}
                        videoStyle={{
                            width: '200px',
                            height: 'auto',
                            position: 'none',
                            borderRadius: '20px',
                        }}
                        constraints={{
                            facingMode: 'environment'
                        }}
                    />
                ) : (
                    <div className="pre-qr">
                        <div className="qr-code">
                            <img src="imgs/qr-code.png" alt="QR Code" />
                        </div>
    
                        <button className="btn-scan" onClick={() => setIsReading(true)}>
                            Escanear Carteira
                        </button>
                    </div>
                )}
            </div>

            <button className="logout" onClick={() => {
                signOut();
                // redriect to login page
                window.location.href = '/login';
            }}>
                Logout
            </button>

            <Modal
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => {
                    setItemModal({
                        isOpen: false,
                        itemUrl: '',
                        itemId: 0,
                    });
                }}
                isOpen={itemModal.isOpen}
                className={'item-modal'}
            >
                <ItemFound
                    item_id={itemModal.itemId}
                    item_url={itemModal.itemUrl}
                    onRedeemItem={handleRedeemItem}
                />
            </Modal>

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
                    resetPage();
                }}
                isOpen={successModal.isOpen}
                className={'scan-modal'}
            >
                <FeedbackModal text={successModal.text} type="success" />
            </Modal>
        </QRCodeScanConteiner>
    )
};

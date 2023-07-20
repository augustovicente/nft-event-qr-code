import { useEffect, useState } from "react";
import { QRCodeScanConteiner } from "./styles"
import { QrReader } from 'react-qr-reader';
import Modal from 'react-modal';
import { api } from "services/api";
import { FeedbackModal } from "./components/FeedbackModal";
import { ItemFound } from "./components/ItemFound";

export const QRCodeScan = () =>
{
    type ModalProps = {
        isOpen: boolean;
        text: string;
    }
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
        isOpen: true,
        itemUrl: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fwww.arweave.net%2FicA7vfsZ9Uhw70qbpkZ2vyrQTyuePW67x-xHOMsWF78%3Fext%3Dpng&w=3840&q=75',
        itemId: 1,
    });

    Modal.setAppElement('#root');

    useEffect(() => {
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
                    console.log('carteira válida')
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
                <span className="by-capitel">by <b>Capitel</b></span>
            </div>

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
                <ItemFound item_id={itemModal.itemId} item_url={itemModal.itemUrl} onRedeemItem={() => {
                    console.log('resgatar item');
                }}/>
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
                }}
                isOpen={successModal.isOpen}
                className={'scan-modal'}
            >
                <FeedbackModal text={successModal.text} type="success" />
            </Modal>
        </QRCodeScanConteiner>
    )
};

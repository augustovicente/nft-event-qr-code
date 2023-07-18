import { useEffect, useState } from "react";
import { QRCodeScanConteiner } from "./styles"
import { QrReader } from 'react-qr-reader';
import Modal from 'react-modal';
import { api } from "services/api";

export const QRCodeScan = () =>
{
    const [data, setData] = useState<string | null>(null);
    const [isReading, setIsReading] = useState<boolean>(false);
    const [loadingModal, setLoadingModal] = useState(false);

    Modal.setAppElement('#root');

    useEffect(() => {
        if (data)
        {
            setIsReading(false);
            setLoadingModal(true);
            api.post('/validate-wallet', { wallet: data }).then((response) => {
                if (response.data)
                {
                    console.log('carteira válida')
                }
            })
            .catch((error) => {
                console.error('carteira inválida', error)
            })
            .finally(() => {
                setLoadingModal(false);
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
                isOpen={loadingModal}
                className={'scan-modal'}
            >
                
            </Modal>
        </QRCodeScanConteiner>
    )
};

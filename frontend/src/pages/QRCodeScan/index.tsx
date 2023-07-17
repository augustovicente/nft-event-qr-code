import { useState } from "react";
import { QRCodeScanConteiner } from "./styles"
import { QrReader } from 'react-qr-reader';

export const QRCodeScan = () => {
    const [data, setData] = useState<string | null>(null);
    return (
        <QRCodeScanConteiner>
            <img className="background" src="imgs/background.png" alt="Background QR Scanner" />
            <div className="qr-content">
                <img className="logo" src="imgs/hacktown.png" alt="Hacktown Logo" />
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            setData(result?.text);
                        }

                        if (error) {
                            console.info(error);
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
                />
                <span className="by-capitel">by <b>Capitel</b></span>
            </div>
        </QRCodeScanConteiner>
    )
};

import { ByCapitel } from "components/ByCapitel/ByCapitel";
import { NFTContainer } from "./styles";
import { useState } from "react";

export const NFT = () => {
    const [nft, setNft] = useState<any>({})
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
                    <span className="amount">
                        01/06
                    </span>
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
                    <button className="collect">Coletar</button>
                    <ByCapitel theme="light"/>
                </div>
            </div>
        </NFTContainer>
    );
};

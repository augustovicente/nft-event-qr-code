import { styled } from "styled-components";

export const QRCodeScanConteiner = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.white};
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    img.background{
        height: 90%;
        width: 100%;
        position: absolute;
        z-index: 0;
        top: 10%;
    }
    div.qr-content{
        z-index: 1;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 100%;
        img.logo{
            height: 50px;
            width: auto;
        }
        span.by-capitel{
            font-family: ${({ theme }) => theme.fontFamily.default};
            color: ${({ theme }) => theme.colors.green};
        }
    }
`;
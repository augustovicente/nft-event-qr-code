import { styled } from "styled-components";

export const QRCodeScanConteiner = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.white};
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
        div.pre-qr {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            img{
                height: auto;
                width: 200px;
            }
            button.btn-scan{
                background-color: ${({ theme }) => theme.colors.yellow};
                color: ${({ theme }) => theme.colors.black};
                font-family: ${({ theme }) => theme.fontFamily.default};
                font-weight: 800;
                width: 200px;
            }
        }
    }
    button.logout{
        background-color: ${({ theme }) => theme.colors.red};
        color: ${({ theme }) => theme.colors.white};
        z-index: 12;
        margin-top: 20px;
    }
`;
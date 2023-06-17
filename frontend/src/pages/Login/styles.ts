import { styled } from "styled-components";

export const LoginContainer = styled.div`
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
    div.login-content{
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
        form{
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
            justify-content: center;
            width: 80%;
            div.form-group{
                display: flex;
                flex-direction: column;
                align-items: start;
                width: 100%;
                label {
                    font-family: ${({ theme }) => theme.fontFamily.default};
                    font-size: ${({ theme }) => theme.fontSizes.heading3};
                    color: ${({ theme }) => theme.colors.green};
                }
                input.form-control{
                    background-color: ${({ theme }) => theme.colors.darkBlue};
                    border-radius: 12px;
                    padding: 10px 10px;
                    border: 0;
                    outline: 0;
                    min-width: calc(100% - 20px);
                    display: flex;
                    font-family: ${({ theme }) => theme.fontFamily.default};
                    font-size: ${({ theme }) => theme.fontSizes.paragraph};
                }
            }
            button.btn{
                padding: 10px 20px;
                background-color: ${({ theme }) => theme.colors.yellow};
                color: ${({ theme }) => theme.colors.black};
                font-family: ${({ theme }) => theme.fontFamily.default};
                font-size: ${({ theme }) => theme.fontSizes.heading3};
                width: 100%;
            }
        }
        span.by-capitel{
            font-family: ${({ theme }) => theme.fontFamily.default};
            color: ${({ theme }) => theme.colors.green};
        }
    }
`;

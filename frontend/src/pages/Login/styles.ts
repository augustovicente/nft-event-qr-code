import { styled } from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
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
                div.pwd-content{
                    width: 100%;
                    position: relative;
                    i{
                        position: absolute;
                        right: 20px;
                        top: 10px;
                        color: ${({ theme }) => theme.colors.yellow};
                        font-size: ${({ theme }) => theme.fontSizes.heading3};
                        cursor: pointer;
                        height: 10px;
                        width: 10px;
                    }
                }
                div.alert-danger{
                    font-family: ${({ theme }) => theme.fontFamily.default};
                    color: ${({ theme }) => theme.colors.yellow};
                    font-size: ${({ theme }) => theme.fontSizes.paragraph};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 10px;
                    width: 100%;
                }
                &.error{
                    input.form-control{
                        border: 2px solid ${({ theme }) => theme.colors.yellow};
                    }
                }
            }
            button.btn{
                padding: 10px 20px;
                background-color: ${({ theme }) => theme.colors.yellow};
                color: ${({ theme }) => theme.colors.black};
                font-family: ${({ theme }) => theme.fontFamily.default};
                font-size: ${({ theme }) => theme.fontSizes.heading3};
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                img{
                    height: 20px;
                    width: auto;
                }
            }
        }
    }
`;

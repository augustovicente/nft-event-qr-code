import { styled } from "styled-components";

export const NFTContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    img.background{
        height: 100vh;
        width: 100vw;
        filter: blur(4px);
        position: absolute;
        z-index: -1;
    }
    img.hacktown{
        height: 50px;
        width: auto;
    }
    div.nft-content{
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        background-color: ${({theme}) => theme.colors.white};
        padding: 10px;
        div.header{
            display: flex;
            flex-direction: column;
            position: relative;
            img.nft-image{
                height: 85vw;
                width: 85vw;
                border-radius: 10px;
            }
            span.amount{
                position: absolute;
                bottom: 0;
                right: 0;
                border-bottom-right-radius: 10px;
                border-top-left-radius: 10px;
                background-color: ${({theme}) => theme.colors.red};
                color: ${({theme}) => theme.colors.white};
                font-size: ${({theme}) => theme.fontSizes.heading3};
                padding: 2px 15px;
            }
        }
        div.body{
            display: flex;
            flex-direction: column;
            border-bottom: 2px solid ${({theme}) => theme.colors.blue};
            margin-bottom: 10px;
            div.title-container{
                margin-top: 5px;
                span{
                    font-family: ${({theme}) => theme.fontFamily.default};
                    font-size: 24px;
                    font-weight: 700;
                    color: ${({theme}) => theme.colors.blue};
                    width: 100%;
                    word-wrap: break-word;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            div.prize-container{
                margin-top: 10px;
                flex-direction: row;
                display: flex;
                gap: 5px;
                align-items: center;
                i.ph{
                    font-size: 24px;
                    color: ${({theme}) => theme.colors.blue};
                }
                span{
                    font-family: ${({theme}) => theme.fontFamily.default};
                    font-size: 16px;
                    line-height: 16px;
                    color: ${({theme}) => theme.colors.pink};
                }
            }
            div.location-container{
                margin-top: 5px;
                margin-bottom: 15px;
                flex-direction: row;
                display: flex;
                gap: 5px;
                align-items: center;
                i.ph{
                    color: ${({theme}) => theme.colors.blue};
                    font-size: 24px;
                }
                div.place{
                    display: flex;
                    flex-direction: column;
                    span{
                        font-family: ${({theme}) => theme.fontFamily.default};
                        line-height: 16px;
                        font-size: 16px;
                        color: ${({theme}) => theme.colors.pink};
                    }
                }
            }
        }
        div.footer{
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            padding: 5px;
            button.collect{
                width: 100%;
                background-color: ${({theme}) => theme.colors.red};
                color: ${({theme}) => theme.colors.white};
                font-family: ${({theme}) => theme.fontFamily.default};
                font-size: ${({theme}) => theme.fontSizes.heading3};
            }
        }
    }
`;
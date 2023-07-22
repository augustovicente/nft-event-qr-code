import { styled } from "styled-components";

type FeedbackModalProps = {
    text: string;
    type?: 'success' | 'error' | 'loading';
    custom_img?: string;
}

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 5px;
    img{
        height: 50px;
        width: 50px;
        &.success{
            height: 100px;
            width: 100px;
        }
    }
    span{
        font-size: 20px;
        font-weight: bold;
        margin-top: 10px;
        text-align: center;
        &.success, &.loading{
            color: ${({ theme }) => theme.colors.pink};
        }
        &.error{
            color: ${({ theme }) => theme.colors.darkBlue};
        }
    }
`;

export const FeedbackModal = ({ text, type, custom_img }:FeedbackModalProps) => {
    return (<LoadingContainer>
        {custom_img && <img src={custom_img} className="custom" alt="Success HackTown" />}
        {!custom_img && type === 'success' && <img src="/imgs/success.gif" className="success" alt="Success HackTown" />}
        {!custom_img && type === 'error' && <img src="/imgs/error.png" alt="Error HackTown" />}
        {!custom_img && type === 'loading' && <img src="/imgs/loading.gif" alt="Loading HackTown" />}
        <span className={`read-wallet ${type}`}>
            {text}
        </span>
    </LoadingContainer>);
}
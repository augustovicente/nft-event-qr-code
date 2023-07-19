import { styled } from "styled-components";

type FeedbackModalProps = {
    text: string;
    type?: 'success' | 'error' | 'loading';
}

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    img{
        height: 50px;
        width: 50px;
        &.success{
            height: 100px;
            width: 100px;
        }
    }
    span{
        font-size: 16px;
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

export const FeedbackModal = ({ text, type }:FeedbackModalProps) => {
    return (<LoadingContainer>
        {type === 'success' && <img src="imgs/success.gif" className="success" alt="Success HackTown" />}
        {type === 'error' && <img src="imgs/error.png" alt="Error HackTown" />}
        {type === 'loading' && <img src="imgs/loading.gif" alt="Loading HackTown" />}
        <span className={`read-wallet ${type}`}>
            {text}
        </span>
    </LoadingContainer>);
}
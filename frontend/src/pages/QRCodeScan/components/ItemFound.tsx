import { styled } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    padding: 10px;
    font-family: ${({ theme }) => theme.fontFamily.default};
    div.header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.colors.darkRed};
        border-radius: 10px 10px 0px 0px;
        padding: 15px 25px;
        gap: 10px;
        margin: 0 7px;
        img{
            width: 30px;
            height: 30px;
        }
        span.title{
            font-size: 12px;
            font-weight: bold;
            font-family: ${({ theme }) => theme.fontFamily.default};
            color: ${({ theme }) => theme.colors.white};
            line-height: 12px;
        }
    }
    div.body{
        display: flex;
        img{
            width: 100%;
            border-radius: 10px;
        }
    }
    div.footer{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 5px;
        button.redeem-item{
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            line-height: 20px;
            font-family: ${({ theme }) => theme.fontFamily.default};
            background-color: ${({ theme }) => theme.colors.red};
            color: ${({ theme }) => theme.colors.white};
        }
        span{
            font-family: ${({ theme }) => theme.fontFamily.default};
            color: ${({ theme }) => theme.colors.darkBlue};
        }
    }
`;

type ItemFoundProps = {
    item_id: number;
    item_url: string;
};

export const ItemFound = ({ item_id, item_url }: ItemFoundProps) => {
    return (<Container>
        <div className="header">
            <img src="imgs/confirmation-check.png" alt="Check de Confirmação de NFT" />
            <span className="title">Colecionável encontrado na carteira</span>
        </div>
        <div className="body">
            <img src={item_url} alt="" />
        </div>
        <div className="footer">
            <button className="redeem-item">Resgatar Item</button>
            <span>by <b>Capitel</b></span>
        </div>
    </Container>);
};

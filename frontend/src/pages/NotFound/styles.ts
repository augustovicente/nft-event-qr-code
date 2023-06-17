import styled from 'styled-components';

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #582482;
    font-size: 2rem;
    font-weight: 700;
    font-family: ${({ theme }) => theme.fontFamily.default};
    text-align: center;
    h1{
        font-size: ${({ theme }) => theme.fontSizes.heading1};
    }
    h2{
        font-size: ${({ theme }) => theme.fontSizes.heading2};
    }
`;

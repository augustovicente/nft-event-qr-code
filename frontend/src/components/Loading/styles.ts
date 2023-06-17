import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    align-content: center;

    .dot-elastic {
        display: flex;
        margin: auto;
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-elastic 1s infinite linear;
    }
    .dot-elastic::before, .dot-elastic::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
    }
    .dot-elastic::before {
        left: -35px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-elastic-before 1s infinite linear;
    }
    .dot-elastic::after {
        left: 35px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-elastic-after 1s infinite linear;
    }

    @keyframes dot-elastic-before {
        0% {
            transform: scale(1, 1);
        }
        25% {
            transform: scale(1, 1.5);
        }
        50% {
            transform: scale(1, 0.67);
        }
        75% {
            transform: scale(1, 1);
        }
        100% {
            transform: scale(1, 1);
        }
    }
    @keyframes dot-elastic {
        0% {
            transform: scale(1, 1);
        }
        25% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(1, 1.5);
        }
        75% {
            transform: scale(1, 1);
        }
        100% {
            transform: scale(1, 1);
        }
    }
    @keyframes dot-elastic-after {
        0% {
            transform: scale(1, 1);
        }
        25% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(1, 0.67);
        }
        75% {
            transform: scale(1, 1.5);
        }
        100% {
            transform: scale(1, 1);
        }
    }
`;

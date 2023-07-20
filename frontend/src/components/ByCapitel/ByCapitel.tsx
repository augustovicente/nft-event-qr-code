import { styled } from "styled-components";

const Span = styled.span<{ _theme: 'dark' | 'light' }>`
    font-family: ${({ theme }) => theme.fontFamily.default};
    color: ${({ theme, _theme }) => _theme === 'dark' ? theme.colors.green : theme.colors.darkBlue};
`;

type Props = {
    theme: 'dark' | 'light';
};

export const ByCapitel = ({ theme }: Props) => {
    return (
        <Span _theme={theme}>
            by <b>Capitel</b>
        </Span>
    )
};

import styled from "styled-components";

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${promps => promps.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span {
        background: ${promps => promps.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }

`;

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${promps => promps.theme['green-500']};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`;
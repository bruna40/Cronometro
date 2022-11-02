import styled from "styled-components";

export const HomeContainer = styled.main`
    flex:1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const BaseButtonContainer = styled.button`
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap:0.5rem;
    font-weight: bold;
    color: ${promps => promps.theme['gray-100']};

    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const ButtonContainer = styled(BaseButtonContainer)`
    background: ${promps => promps.theme['green-500']};

    &:not(:disabled):hover {
        background: ${promps => promps.theme['green-700']};
    }
`;

export const StopButtonContainer = styled(BaseButtonContainer)`
    background: ${promps => promps.theme['red-500']};

    &:not(:disabled):hover {
        background: ${promps => promps.theme['red-700']};
    }
`;

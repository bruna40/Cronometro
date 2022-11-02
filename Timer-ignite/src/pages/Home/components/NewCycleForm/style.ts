import styled from "styled-components";

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${promps => promps.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;

`;

const baseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border:0;
    border-bottom: 2px solid ${promps => promps.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${promps => promps.theme['gray-100']};

    &:focus {
        box-shadow: none;
        border-color: ${promps => promps.theme['green-500']};
    }

    &::placeholder {
        color: ${promps => promps.theme['gray-500']};
    }
`;

export const TaskInput = styled(baseInput)`
   flex:1;
   &::-webkit-calendar-picker-indicator {
        display:none !important;
   }

`;

export const MinutesInput = styled(baseInput)`
    width: 4rem;
`;
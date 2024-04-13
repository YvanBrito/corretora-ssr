import styled from "styled-components";

export const BtnPrimary = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 1.5rem;
  border: none;
  border-radius: 3rem;
  width: 100%;
  height: 4.5rem;
  transition: cubic-bezier(0.4, 0, 0.2, 1) all 300ms;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.highlight};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: translateY(-1px);
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.primary.pressed};
  }
`;

import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.main};
  border-top: 1px solid ${({ theme }) => theme.palette.border};

  @media only screen and (max-height: 700px) {
    display: none;
  }
`;

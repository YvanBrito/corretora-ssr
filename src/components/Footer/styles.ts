import styled from "styled-components";

export const Footer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.main};
  border-top: 1px solid ${({ theme }) => theme.palette.border};

  @media only screen and (max-height: 700px) {
    display: none;
  }
`;

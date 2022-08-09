import styled from "styled-components";

export const Footer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-top: 1px solid ${({ theme }) => theme.palette.primary.main};

  @media only screen and (max-height: 700px) {
    display: none;
  }
`;

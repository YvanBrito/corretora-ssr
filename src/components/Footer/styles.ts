import styled from "styled-components";

export const Footer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: $bg-gray-50;
  border-top: 1px solid $bg-gray-400;
  /* height: 6rem; */

  @media only screen and (max-height: 700px) {
    display: none;
  }
`;

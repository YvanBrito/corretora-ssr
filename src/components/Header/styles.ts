import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: ${({ theme }) => theme.palette.common.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
`;

export const NavMenu = styled.nav`
  display: flex;
`;

export const MenuList = styled.ul`
  display: flex;
  list-style: none;
  li {
    margin-left: 2rem;
  }
  li a {
    color: black;
    text-decoration: none;
  }
`;

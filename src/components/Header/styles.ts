import styled from "styled-components";

const bggray400 = "#9ca3af";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: ${bggray400};
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

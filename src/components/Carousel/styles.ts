import styled, { css } from "styled-components";

export const Carousel = styled.div`
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  @media only screen and (max-height: 750px) {
    height: 50vh;
  }
`;

export const Showcase = styled.div`
  width: 90%;
  display: flex;
  overflow: hidden;
`;

export const Esteira = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in;
  margin-left: calc(50% - 28rem);
  @media only screen and (max-width: 740px) {
    margin-left: calc(50% - 17rem);
  }
`;

export const SideControllers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  background-color: white;
  &::after {
    content: "";
    display: block;
    width: 1rem;
    height: 1rem;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
  }
`;

export const SideControllersLeft = styled(SideControllers)`
  &::after {
    transform: translateX(2px) rotate(45deg);
  }
`;

export const SideControllersRight = styled(SideControllers)`
  &::after {
    transform: translateX(-2px) rotate(225deg);
  }
`;

interface IFrameProps {
  isSelected: boolean;
}

export const Frame = styled.div<IFrameProps>`
  object-fit: contain;
  position: relative;
  margin: 0 2rem;
  transition: all 0.3s ease-in;
  width: 30rem;
  height: 20rem;
  border-radius: 2rem;
  overflow: hidden;

  ${({ isSelected }) =>
    isSelected &&
    css`
      width: 50rem;
      height: 30rem;
      @media only screen and (max-width: 740px) {
        width: 30rem;
        height: 20rem;
      }
    `}
`;

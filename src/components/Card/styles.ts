import styled from "styled-components";

export const CardWrapper = styled.div`
  height: 40rem;
  width: 30rem;
  background-color: white;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 1.5rem;
  overflow: hidden;
  text-decoration: none;
  color: black;
  transition: ease-in 150ms;
  cursor: pointer;

  &:hover {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.4),
      0 8px 10px -6px rgb(0 0 0 / 0.4);
  }
`;

export const CardDetails = styled.div`
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.palette.common.black};
  }
`;

export const CardDetailsTop = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 20rem;
  transition: background-image 0.1s ease-in;
  .interactables {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    display: inline-block;
    background-color: white;
    height: 7px;
    width: 7px;
    margin: 5px;
    border-radius: 2rem;
    transition: transform 0.1s ease-in;
  }
  .circle-selected {
    display: inline-block;
    background-color: white;
    height: 7px;
    width: 7px;
    margin: 5px;
    border-radius: 2rem;
    transform: scale(2);
    transition: transform 0.1s ease-in;
  }
`;

export const CardDetailsBottom = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;

  .property-type {
    display: inline-block;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 0.2rem 0.7rem;
    border-radius: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .basic-info {
    color: ${({ theme }) => theme.palette.common.black};

    span {
      &:first-child {
        margin-right: 2.3rem;
      }
      i {
        margin-right: 0.7rem;
      }
    }
  }

  .price {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    color: ${({ theme }) => theme.palette.common.black};
    span:nth-child(2) {
      font-weight: bold;
    }

    .total {
      font-weight: bold;
      color: green;
      font-size: 1.3rem;
      margin-top: 1rem;
    }
  }
`;

export const Interectables = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18rem;
  width: 95%;
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

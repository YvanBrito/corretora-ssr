import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const ShelfSearch = styled.section`
  width: 100vw;
  border-right: 1px solid ${({ theme }) => theme.palette.border};
`;

export const HeaderShelfSearch = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border};
  padding: 2rem;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      margin-right: 1rem;
    }
  }
  @media only screen and (max-height: 700px) {
    display: none;
  }
`;

export const Shelf = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  padding: 3rem;
  height: calc(100vh - 32rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-height: 700px) {
    height: calc(100vh - 13rem);
  }
  @media only screen and (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (min-width: 990px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (min-width: 1460px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const MapSide = styled.section`
  display: none;

  @media only screen and (min-width: 990px) {
    display: block;
    position: relative;
    width: 34%;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  padding-bottom: 2rem;
`;

export const PropertyTypeInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
`;

export const ModalTabs = styled.div`
  input {
    display: none;

    &:checked + label {
      background-color: ${({ theme }) => theme.palette.secondary.main};
      color: black;
    }
  }

  label {
    display: inline-block;
    text-align: center;
    padding: 1rem 4rem;
    color: ${({ theme }) => theme.palette.secondary.main};
    font-weight: bold;
    background-color: white;
    transition: background-color 0.3s ease-in, color 0.3s ease-in;
    border: 1px solid ${({ theme }) => theme.palette.secondary.main};
    width: 8rem;
    &:first-of-type {
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
    }
    &:last-of-type {
      border-top-right-radius: 2rem;
      border-bottom-right-radius: 2rem;
    }
  }
`;

export const ClearFilterBtn = styled.button`
  background-color: white;
  padding: 1.5rem;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 3rem;
  width: 13rem;
`;

export const ModalBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 1.5rem;
  border: none;
  border-radius: 3rem;
  width: 13rem;
  transition: cubic-bezier(0.4, 0, 0.2, 1) all 300ms;
  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: translateY(-1px);
  }
`;

export const InputRadio = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;

  &:hover input[type="radio"] {
    border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  }

  input[type="radio"] {
    appearance: none;
    background-color: #fff;
    margin: 0 1rem 0 0;
    border: 1px solid ${({ theme }) => theme.palette.secondary.main};
    height: 1.8rem;
    width: 1.8rem;

    &:checked {
      border: 1px solid ${({ theme }) => theme.palette.primary.main};
      background-color: black;
      &::after {
        content: "";
        position: relative;
        top: -1px;
        left: 2px;
        display: inline-block;
        height: 0.5rem;
        width: 1rem;
        transform: rotate(-45deg);
        border: 2px solid white;
        border-top: none;
        border-right: none;
        animation: check 0.1s;
      }
    }
  }

  @keyframes check {
    0% {
      width: 0rem;
      height: 0rem;
    }
    100% {
      width: 1rem;
      height: 0.5rem;
    }
  }
`;

export const FilterBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.common.black};
  border-radius: 1rem;
  color: white;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
`;

import styled from "styled-components";

export const MainSection = styled.section`
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10rem;
`;

export const MainTitle = styled.h1`
  margin-bottom: 15rem;
  font-weight: bold;
  font-size: 9rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const HomeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AcquisitionTypes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 2rem;
  width: 20rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;

  @media only screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

export const BottomSearchField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  width: 70vw;
  border-radius: 0.6rem;
  padding: 2rem;

  @media only screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem 4rem;
  }
`;

export const SelectInput = styled.select`
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 3rem;
  padding: 1.5rem;
`;

export const TextInput = styled.input`
  width: 80%;
  height: 2.5rem;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 3rem;

  @media only screen and (min-width: 1280px) {
    width: 100%;
  }

  &Search {
    visibility: hidden;
    @media only screen and (min-width: 1280px) {
      visibility: visible;
      width: 20%;
      margin: 0;
    }
  }
`;

export const TextInputHome = styled.input`
  width: 80%;
  height: 2.5rem;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 3rem;
  margin: 2rem 4rem;
`;

export const BtnPrimary = styled.button`
  background-color: ${({ theme }) => theme.palette.common.white};
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

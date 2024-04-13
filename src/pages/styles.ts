import styled from "styled-components";

const MainSection = styled.section`
  height: calc(100vh - 52px - 34px);
`;

const BackgroundFront = styled.div`
  @media only screen and (min-width: 768px) {
    background-image: url("/assets/front.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
  }
`;

const Container = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;

  @media only screen and (min-width: 768px) {
    padding: 2rem 2rem;
    left: 70%;
    width: 25%;
  }
`;

const MainTitle = styled.span`
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  margin: 2rem 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const HomeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const AcquisitionTypes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.main};
  padding: 2rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  width: 80%;

  @media only screen and (min-width: 768px) {
    width: 20rem;
  }

  @media only screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

const BottomSearchField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.main};
  border-radius: 0.6rem;
  padding: 2rem;
  width: 80%;

  @media only screen and (min-width: 768px) {
    width: 20vw;
  }

  @media only screen and (min-width: 1280px) {
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 4rem;
  }
`;

const SelectInput = styled.select`
  border: 1px solid ${({ theme }) => theme.palette.border};
  border-radius: 3rem;
  padding: 1.5rem;
  width: 100%;
`;

const TextInput = styled.input`
  width: 80%;
  height: 2.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
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

const TextInputHome = styled.div`
  width: 100%;
  margin: 2rem 4rem;
  input {
    width: 98%;
    height: 4.5rem;
    padding-left: 1rem;
    border: 1px solid ${({ theme }) => theme.palette.border};
    border-radius: 3rem;
    margin: 0;
  }
`;

const styles = {
  MainSection,
  BackgroundFront,
  Container,
  MainTitle,
  HomeForm,
  AcquisitionTypes,
  BottomSearchField,
  SelectInput,
  TextInput,
  TextInputHome,
};

export default styles;

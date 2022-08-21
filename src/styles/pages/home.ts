import styled from "styled-components";

const MainSection = styled.section`
  height: 100%;
`;

const BackgroundFront = styled.div`
  background-image: url("/assets/front.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* filter: blur(3px);
  -webkit-filter: blur(3px); */
  height: 100%;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 2rem 2rem;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 2;
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
`;

const AcquisitionTypes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.background.main};
  padding: 2rem;
  width: 20rem;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;

  @media only screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

const BottomSearchField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.main};
  width: 20vw;
  border-radius: 0.6rem;
  padding: 2rem;

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

const BtnPrimary = styled.button`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 1.5rem;
  border: none;
  border-radius: 3rem;
  width: 100%;
  height: 4.5rem;
  transition: cubic-bezier(0.4, 0, 0.2, 1) all 300ms;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.highlight};
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    transform: translateY(-1px);
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.primary.pressed};
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
  BtnPrimary,
};

export default styles;

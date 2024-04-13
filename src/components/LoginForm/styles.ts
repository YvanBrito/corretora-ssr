import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 50rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-top: 7rem;
  margin-bottom: 7rem;
`;

export const Field = styled.div`
  font-size: ${({ theme }) => theme.fontSize};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 4rem;
  &:focus-within label {
    top: -3rem;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  transition: top 0.4s;
  cursor: text;
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid black;
  outline: none;
  width: 100%;
  &:not(:placeholder-shown) + label {
    top: -3rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 8rem;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize};
  justify-content: space-between;

  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

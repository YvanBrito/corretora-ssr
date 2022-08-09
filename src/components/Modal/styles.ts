import styled, { css } from "styled-components";

interface IModalProps {
  showModal: boolean;
}

export const Modal = styled.div<IModalProps>`
  position: absolute;
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  top: 50%;
  left: 50%;
  z-index: 2;

  @media only screen and (max-width: 730px) {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  ${({ showModal }) =>
    showModal
      ? css`
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          visibility: visible;
          opacity: 1;
          transition: all 0.2s ease-in;
        `
      : css`
          -webkit-transform: translate(-50%, calc(-50% - 50px));
          transform: translate(-50%, calc(-50% - 50px));
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s ease-in;
        `}
`;

export const Overlay = styled.div<IModalProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  ${({ showModal }) =>
    showModal
      ? css`
          visibility: visible;
          opacity: 1;
          transition: visibility 0s, opacity 0.2s linear;
        `
      : css`
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s linear 0.2s, opacity 0.2s linear;
        `}
`;

import { ReactNode, useCallback, useEffect, useState } from "react";
import * as S from "./styles";

interface ModalProps {
  children: ReactNode;
  openModal: boolean;
  handleClose: () => void;
}

export default function Modal({
  children,
  openModal,
  handleClose,
}: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const close = () => {
    setShowModal(false);
    handleClose();
  };

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }, []);

  useEffect(() => {
    setShowModal(openModal);
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [openModal]);

  return (
    <>
      <S.Modal showModal={showModal}>{children}</S.Modal>
      <S.Overlay showModal={showModal} onClick={close}></S.Overlay>
    </>
  );
}

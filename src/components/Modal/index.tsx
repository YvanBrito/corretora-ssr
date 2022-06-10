import { ReactNode, useCallback, useEffect, useState } from "react";

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
      <div
        className={`filter-modal ${showModal ? "slide-bottom" : "slide-top"}`}
      >
        {children}
      </div>
      <div
        className={`overlay ${showModal ? "fade-in" : "fade-out"}`}
        onClick={close}
      ></div>
    </>
  );
}

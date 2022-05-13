import { ReactNode, useEffect, useState } from "react";

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

  useEffect(() => {
    setShowModal(openModal);
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

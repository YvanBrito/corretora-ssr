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

  return showModal ? (
    <>
      <div className="filter-modal">{children}</div>
      <div className="overlay" onClick={close}></div>
    </>
  ) : (
    <></>
  );
}

import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

export default function MyHeader() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <header className="header">
      <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
        <p>Login</p>
      </Modal>
      <div></div>
      <nav className="nav-menu">
        <ul className="menu-list">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a onClick={() => setShowModal(true)} href="#">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

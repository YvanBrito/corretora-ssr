import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";

export default function MyHeader() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const testLogin = async () => {
    try {
      await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
    try {
      await fetch("http://localhost:3000/user")
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log("Erro de solicitação", err));
    } catch (error) {
      console.error(error);
    }
  };
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
            <a onClick={testLogin} href="#">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

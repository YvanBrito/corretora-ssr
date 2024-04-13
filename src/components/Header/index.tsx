import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import LoginForm from "../LoginForm";

import * as S from "./styles";

export default function MyHeader() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const testLogin = async () => {
    try {
      await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_API}/login`, {
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
      await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_API}/user`)
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log("Erro de solicitação", err));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <S.Header>
      <Modal openModal={showModal} handleClose={() => setShowModal(false)}>
        <LoginForm />
      </Modal>
      <S.NavMenu>
        <S.MenuList>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <a onClick={() => setShowModal(true)} href="#">
              Entrar
            </a>
          </li>
        </S.MenuList>
      </S.NavMenu>
    </S.Header>
  );
}

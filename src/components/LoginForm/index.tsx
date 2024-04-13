import { SubmitHandler, useForm } from "react-hook-form";
import PrimaryButton from "../PrimaryButton";

import * as S from "./styles";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log(data);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Container>
        <S.Title>LOGIN</S.Title>
        <S.Field>
          <S.Input
            placeholder=" "
            id="email"
            {...register("email", { required: true })}
          />
          <S.Label htmlFor="email">Email</S.Label>
        </S.Field>

        <S.Field>
          <S.Input
            type="password"
            id="password"
            placeholder=" "
            {...register("password", { required: true })}
          />
          <S.Label htmlFor="password">Password</S.Label>
        </S.Field>

        <PrimaryButton label="Entrar" />

        <S.Footer>
          <span>Esqueceu a senha?</span>
          <span>Criar conta</span>
        </S.Footer>
      </S.Container>
    </S.Form>
  );
}

import * as S from "./styles";

interface IPrimaryButtonProps {
  label: string;
}

function PrimaryButton({ label }: IPrimaryButtonProps) {
  return <S.BtnPrimary type="submit">{label}</S.BtnPrimary>;
}

export default PrimaryButton;

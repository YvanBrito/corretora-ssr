import { useState } from "react";
import Image from "next/image";

import * as S from "./styles";

interface CardProps {
  images: string[];
}

export default function Carousel({ images }: CardProps) {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  return (
    <S.Carousel>
      <S.SideControllersLeft
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImg((oldState) => (oldState > 0 ? --oldState : oldState));
        }}
      ></S.SideControllersLeft>
      <S.Showcase>
        <S.Esteira
          style={{
            transform: `translateX(calc(${-34 * selectedImg}rem))`,
          }}
        >
          {images.map((img, index) => (
            <S.Frame isSelected={selectedImg === index} key={index}>
              <Image layout="fill" alt="image" src={`/assets/imoveis/${img}`} />
            </S.Frame>
          ))}
        </S.Esteira>
      </S.Showcase>
      <S.SideControllersRight
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImg((oldState) =>
            oldState < images.length - 1 ? ++oldState : oldState
          );
        }}
      ></S.SideControllersRight>
    </S.Carousel>
  );
}

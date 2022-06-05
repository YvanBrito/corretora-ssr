import { useState } from "react";
import Image from "next/image";

interface CardProps {
  images: string[];
}

export default function Carousel({ images }: CardProps) {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  return (
    <div className="carousel">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImg((oldState) => (oldState > 0 ? --oldState : oldState));
        }}
        className="side-controllers side-controllers-left"
      ></div>
      <div className="showcase">
        <div
          style={{
            transform: `translateX(calc(${-34 * selectedImg}rem))`,
          }}
          className="esteira"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className={`frame ${selectedImg === index && "frame-selected"}`}
            >
              <Image layout="fill" alt="image" src={`/assets/imoveis/${img}`} />
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedImg((oldState) =>
            oldState < images.length - 1 ? ++oldState : oldState
          );
        }}
        className="side-controllers side-controllers-right"
      ></div>
    </div>
  );
}

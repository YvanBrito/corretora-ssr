import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../theme";
import Card, { CardProps } from ".";

const props: CardProps = {
  property: {
    id: 0,
    createdAt: "2022-05-09T20:00:00",
    type: "apartment",
    isRent: true,
    address: {
      streetName: "Rua dos Amigos",
      number: "43",
      district: "Nazaré",
      city: "Belém",
      state: "Pará",
      stateInitials: "PA",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus massa, tincidunt ut mattis eget, sollicitudin eget ipsum. In ut nibh hendrerit orci ultrices mattis eget a nisl. Etiam vitae dui lobortis, congue velit convallis, pulvinar metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tellus justo, ornare vitae placerat et, lacinia feugiat massa. Ut vel sem quam. Quisque felis urna, aliquam nec vestibulum sed, dictum vel nunc. Aliquam vel tristique nibh. Sed porta erat vitae urna malesuada dapibus. Maecenas lorem nibh, vulputate a ex at, congue pellentesque nisi. Nunc pellentesque dapibus turpis sit amet tincidunt. Integer vel ligula id mi ornare lobortis. Aliquam nec tincidunt turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam vulputate tortor vitae quam ullamcorper consequat. Pellentesque venenatis varius mi non iaculis.",
    area: 34,
    lng: -48.4086717,
    lat: -1.3569995,
    bedroomsQty: 3,
    bathroomQty: 1,
    rentPrice: "1234",
    buyPrice: "0",
    iptu: "300",
    condominiumPrice: "312",
    serviceRate: "32",
    isPetFriendly: true,
    furnished: false,
    floor: 3,
    carSpot: 1,
    seller: {
      name: "Yvan Brito",
      phone: 5591983213832,
      email: "teste@teste.com",
    },
    totalPrice: "67576",
    images: [
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
      "imovel3.webp",
      "imovel2.webp",
    ],
  },
};

describe("<Card/>", () => {
  it("should render the component", () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Card {...props} />
      </ThemeProvider>
    );

    expect(screen.getByText("Aluguel")).toBeInTheDocument();
  });
});

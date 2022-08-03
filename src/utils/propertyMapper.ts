import { IProperty } from "../pages/busca";

export const typeMap: Map<string, string> = new Map([
  ["apartment", "Apartamento"],
  ["house", "Casa"],
  ["condominium", "Casa de Condomínio"],
  ["kitnet", "Kitnet"],
]);

export const propertiesMapper = (properties: IProperty[]) => {
  return properties.map((p: IProperty) => ({
    ...p,
    type: typeMap.get(p.type) || "",
    rentPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.rentPrice),
    buyPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.buyPrice),
    iptu: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.iptu),
    serviceRate: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.serviceRate),
    condominiumPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.condominiumPrice),
    totalPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(p.rentPrice + p.serviceRate + p.iptu + p.condominiumPrice),
  }));
};

export const propertyMapper = (property: IProperty, op: any) => {
  console.log(property);
  console.log(op);
  return {
    ...property,
    type: typeMap.get(property.type) || "",
    rentPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.rentPrice),
    buyPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.buyPrice),
    iptu: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.iptu),
    serviceRate: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.serviceRate),
    condominiumPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.condominiumPrice),
    totalPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(
      property.rentPrice +
        property.serviceRate +
        property.iptu +
        property.condominiumPrice
    ),
  };
};

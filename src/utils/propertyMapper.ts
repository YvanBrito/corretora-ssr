import { IProperty } from "../pages/busca";

export const typeMap: Map<string, string> = new Map([
  ["apartment", "Apartamento"],
  ["house", "Casa"],
  ["condominium", "Casa de Condomínio"],
  ["kitnet", "Kitnet"],
]);

export const propertyMapper = (properties: IProperty[]) => {
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

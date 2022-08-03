// src/mocks/handlers.js
import { rest } from "msw";
import { typeMap } from "../../utils/propertyMapper";
import properties from "../responses/imoveis.json";

export const handlersSearch = [
  rest.get("http://localhost:3000/search", (req, res, ctx) => {
    const acquisitionType = req.url.searchParams.get("acquisitionType");
    const propertyType = req.url.searchParams.get("propertyType");
    const location = req.url.searchParams.get("location");
    const lat = req.url.searchParams.get("lat");
    const lng = req.url.searchParams.get("lng");

    return res(
      ctx.status(200),
      ctx.json({
        properties,
      })
    );
  }),
  rest.get("http://localhost:3000/filter", (req, res, ctx) => {
    const propertyType = req.url.searchParams.getAll("propertyType");
    const newPropertiesFiltered = properties.filter((p) => {
      if (propertyType) {
        return propertyType.includes(p.type);
      } else {
        return p;
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        properties: newPropertiesFiltered,
      })
    );
  }),
];

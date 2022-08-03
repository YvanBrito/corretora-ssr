// src/mocks/handlers.js
import { rest } from "msw";
import properties from "../responses/imoveis.json";

export const handlersSearch = [
  rest.get("http://localhost:3000/filter", (req, res, ctx) => {
    const propertyType = req.url.searchParams.getAll("propertyType");
    const swlat = req.url.searchParams.get("swlat");
    const swlng = req.url.searchParams.get("swlng");
    const nelat = req.url.searchParams.get("nelat");
    const nelng = req.url.searchParams.get("nelng");
    const newPropertiesFiltered = properties.filter((p) => {
      if (
        p.lat > (swlat ? +swlat : -Infinity) &&
        p.lat < (nelat ? +nelat : Infinity) &&
        p.lng > (swlng ? +swlng : -Infinity) &&
        p.lng < (nelng ? +nelng : Infinity)
      ) {
        if (propertyType.length > 0) {
          if (propertyType.includes(p.type)) {
            return p;
          }
        } else {
          return p;
        }
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        properties: newPropertiesFiltered,
      })
    );
  }),
  rest.get("http://localhost:3000/property/:id", (req, res, ctx) => {
    const propertyId = req.params.id || "-1";

    if (Number(req.params.id) === NaN) {
      return res(
        ctx.status(400),
        ctx.json({
          errorMessage: "ID inserido não é um número",
        })
      );
    }

    const property = properties.find((p) => p.id === +propertyId);

    if (!property) {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: "Propriedade não encontrada",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        property,
      })
    );
  }),
];

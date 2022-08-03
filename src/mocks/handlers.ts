import { handlersAuth } from "./handlers/authentication";
import { handlersSearch } from "./handlers/search";

export const handlers = [...handlersAuth, ...handlersSearch];

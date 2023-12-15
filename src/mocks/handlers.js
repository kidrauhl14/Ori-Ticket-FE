// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { postHandler } from "./handlers/postHandler";
import { authHandler } from "./handlers/authHandler";

export const handlers = [...authHandler, ...postHandler];


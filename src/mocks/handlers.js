// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { postHandler } from "./handlers/postHandler";

export const handlers = [...postHandler];

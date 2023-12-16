// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { postHandler } from "./handlers/postHandler";
import { authHandler } from "./handlers/authHandler";
import { sportsHandler } from "./handlers/sportsHandler";
import { stadiumHandler } from "./handlers/stadiumHandler";
import { awayteamHandler } from "./handlers/awayteamHandler";
import { seatHandler } from "./handlers/seatHandler";

export const handlers = [
  ...authHandler,
  ...postHandler,
  ...sportsHandler,
  ...stadiumHandler,
  ...awayteamHandler,
  ...seatHandler,
];

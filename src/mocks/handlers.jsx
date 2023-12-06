// src/mocks/handlers.js
import { http } from "msw";
import authHandler from "./handlers/authHandler";

export const handlers = [
    authHandler,
];



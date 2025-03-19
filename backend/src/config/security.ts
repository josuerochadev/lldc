import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";

export const configureSecurity = (app: express.Express) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
};
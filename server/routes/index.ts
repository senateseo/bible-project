import { Application } from "express";
import bibleRoutes from "./bible";

export default class Routes {
  constructor(app: Application) {
    app.use("/bible", bibleRoutes);
  }
}
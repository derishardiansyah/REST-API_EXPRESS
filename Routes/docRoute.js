import express from "express";
import docController from "../Controllers/docController.js";

const docRouter = express.Router();

docRouter.get("/", docController.getAllDocs);

export default docRouter;

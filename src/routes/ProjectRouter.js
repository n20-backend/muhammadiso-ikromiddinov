import express from "express";
import * as projectController from "../controller/projectController.js";


const projectRouter = express.Router();

projectRouter.get("/", projectController.getProjects);
projectRouter.get("/:id", projectController.getProject);
projectRouter.post("/", projectController.createProject);
projectRouter.put("/:id", projectController.updateProject);
projectRouter.delete("/:id", projectController.deleteProject)

export default projectRouter;

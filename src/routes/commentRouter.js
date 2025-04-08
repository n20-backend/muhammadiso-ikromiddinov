import express from "express";
import * as CommentController from "../controller/CommentController.js";


const commentRouter = express.Router();

commentRouter.get("/", CommentController.getAllComments);
commentRouter.get("/:id", CommentController.getCommentById);
commentRouter.post("/", CommentController.createComment);
commentRouter.put("/:id", CommentController.updateComment);
commentRouter.delete("/:id", CommentController.deleteComment)

export default commentRouter;
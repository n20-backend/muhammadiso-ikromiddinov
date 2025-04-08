import express from 'express';
import taskrouter from './routes/TasksRouter.js';
import userRouter from './routes/UserRouter.js';
import projectRouter from './routes/ProjectRouter.js';
import commentRouter from './routes/commentRouter.js'
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use('/tasks', taskrouter);
app.use('/comments', commentRouter);



app.listen(3000, () => { 
    console.log(`Server is running on port ${PORT}`);
});

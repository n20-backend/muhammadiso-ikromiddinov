import express from 'express';
import taskrouter from './routes/tasks.js';
import dotenv from 'dotenv';


dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskrouter);
app.use("/projects",)


app.listen(3000, () => { 
    console.log(`Server is running on port ${PORT}`);
});

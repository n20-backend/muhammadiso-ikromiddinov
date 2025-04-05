import express from 'express';
import taskrouter from './src/routes/tasks.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", taskrouter);


app.listen(3000, () => { 
    console.log(`Server is running on port ${PORT}`);
});

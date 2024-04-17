import express from 'express';
import cors from 'cors'
import {lessonsRouter} from "./controllers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/lessons', lessonsRouter)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
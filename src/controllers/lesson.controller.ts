import express from "express";
import {getLessons} from "../services";
import {GetLessonsQueryDto} from "../dto";
import {ParamsDictionary} from 'express-serve-static-core';

export const lessonsRouter = express.Router();

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

lessonsRouter.get("/", async (req: express.Request<{}, {}, {}, GetLessonsQueryDto>, res: express.Response) => {
    try {
        const lessons = await getLessons(req.query)
        res.json(lessons);
    } catch (e) {
        res.sendStatus(400)
    }
})

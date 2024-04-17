import {Status} from "../enums";
import {Student} from "./student.entity";
import {Teacher} from "./teacher.entity";

export interface Lesson {
    id: number;
    date: string;
    title: string;
    status: Status
    visitCount: number
    students: Array<Student>
    teachers: Array<Teacher>
}
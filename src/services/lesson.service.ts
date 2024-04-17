import {GetLessonsQueryDto} from "../dto";
import {Lesson} from "../entities";
import {db} from "../config";

export async function getLessons(getLessonsQueryDto: GetLessonsQueryDto): Promise<Array<Lesson>> {
    try {
        const {
            date,
            status,
            teacherIds,
            studentsCount,
            page = '1',
            lessonsPerPage = '5',
        } = getLessonsQueryDto;

        const visitCountSubquery = db('lesson_students')
            .count('*')
            .where('lesson_students.lesson_id', db.ref('lessons.id'))
            .andWhere('visit', true)
            .as('visitCount');

        let query = db('lessons')
            .leftJoin('lesson_students', 'lessons.id', 'lesson_students.lesson_id')
            .leftJoin('lesson_teachers', 'lessons.id', 'lesson_teachers.lesson_id')
            .leftJoin('students', 'lesson_students.student_id', 'students.id')
            .leftJoin('teachers', 'lesson_teachers.teacher_id', 'teachers.id')
            .select(
                'lessons.id',
                'lessons.date',
                'lessons.title',
                'lessons.status',
                db.raw(`(${visitCountSubquery}) as "visitCount"`),
                db.raw(`ARRAY_AGG(DISTINCT jsonb_build_object('id', students.id, 'name', students.name, 'visit', lesson_students.visit)) as students`),
                db.raw(`ARRAY_AGG(DISTINCT jsonb_build_object('id', teachers.id, 'name', teachers.name)) as teachers`)
            )
            .groupBy('lessons.id');

        if (date) {
            const dates = date.split(',');
            if (dates.length === 1) {
                query.where('lessons.date', dates[0]);
            } else if (dates.length === 2) {
                query.whereBetween('lessons.date', [dates[0], dates[1]]);
            }
        }

        if (status) {
            query.where('lessons.status', status);
        }

        if (teacherIds) {
            const ids = teacherIds.split(',').map(id => parseInt(id));
            query.whereIn('lesson_teachers.teacher_id', ids);
        }

        if (studentsCount) {
            const counts = studentsCount.split(',').map(count => parseInt(count, 10));

            const subquery = db('lesson_students')
                .select('lesson_id')
                .count('* as count')
                .where('visit', true)
                .groupBy('lesson_id')
                .as('student_counts');

            query = query.join(subquery, 'lessons.id', 'student_counts.lesson_id');

            if (counts.length === 1) {
                query = query.where('student_counts.count', '=', counts[0]);
            } else if (counts.length === 2) {
                query = query.whereBetween('student_counts.count', [counts[0], counts[1]]);
            }
        }

        const offset = (parseInt(page) - 1) * parseInt(lessonsPerPage);
        query.limit(parseInt(lessonsPerPage)).offset(offset);

        return await query;
    } catch (error) {
        console.error(error);
        throw new Error();
    }
}

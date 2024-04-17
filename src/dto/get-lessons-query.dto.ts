export interface GetLessonsQueryDto {
    date?: string;
    status?: string;
    teacherIds?: string;
    studentsCount?: string;
    page?: string;
    lessonsPerPage?: string;
}
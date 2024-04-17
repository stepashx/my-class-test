/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return Promise.all([
        knex.schema.table('lessons', function(table) {
            table.index('date', 'idx_lessons_date');
            table.index('status', 'idx_lessons_status');
        }),
        knex.schema.table('lesson_teachers', function(table) {
            table.index('teacher_id', 'idx_lesson_teachers_teacher_id');
            table.index('lesson_id', 'idx_lesson_teachers_lesson_id');
        }),
        knex.schema.table('lesson_students', function(table) {
            table.index('lesson_id', 'idx_lesson_students_lesson_id');
            table.index('visit', 'idx_lesson_students_visit');
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.table('lessons', function(table) {
            table.dropIndex('date', 'idx_lessons_date');
            table.dropIndex('status', 'idx_lessons_status');
        }),
        knex.schema.table('lesson_teachers', function(table) {
            table.dropIndex('teacher_id', 'idx_lesson_teachers_teacher_id');
            table.dropIndex('lesson_id', 'idx_lesson_teachers_lesson_id');
        }),
        knex.schema.table('lesson_students', function(table) {
            table.dropIndex('lesson_id', 'idx_lesson_students_lesson_id');
            table.dropIndex('visit', 'idx_lesson_students_visit');
        })
    ]);
};

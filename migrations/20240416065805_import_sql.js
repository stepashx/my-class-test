/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const {readFileSync} = require("node:fs");
const {join} = require("node:path");

exports.up = function(knex) {
    const sqlFileName = 'test.sql'
    const sqlFilePath = join(__dirname, `../sql-files/${sqlFileName}`);
    const sql = readFileSync(sqlFilePath, { encoding: 'utf-8' });
    return knex.raw(sql);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

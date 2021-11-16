import pool from '../utils/pool.js';

export default class Solution {
  id;
  description;
  code;
  problem;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
    this.code = row.code;
    this.problem = row.problem;
  }

  static async create({ description, code }) {
    const { rows } = await pool.query(`
      INSERT INTO solutions (description, code, problem)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [description, code]);

    return new Solution(rows[0]);
  }

  static async findDescription({ description }) {
    const { rows } = await pool.query(`
      SELECT *
      FROM solutions
      WHERE description ~* $1
    `, [description]);

    return rows.map(row => new Solution(row));
  }

}

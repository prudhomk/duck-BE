import pool from '../utils/pool.js';

export default class Problem {
  id;
  name;
  description;
  code;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.code = row.code;
  }

  static async create({ name, description, code }) {
    const { rows } = await pool.query(`
      INSERT INTO problems (name, description, code)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, description, code]);

    return new Problem(rows[0]);
  }

  static async findDescription({ description }) {
    const { rows } = await pool.query(`
      SELECT *
      FROM problems
      WHERE description ~* $1
    `, [description]);

    return rows.map(row => new Problem(row));
  }

}

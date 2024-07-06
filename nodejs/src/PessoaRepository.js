import mysql from "mysql2/promise";
import { faker } from "@faker-js/faker";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

console.log("Configuração da conexão com o banco: ", config);

export class PessoaRepository {
  async inserirNomeNaTabela() {
    const connection = await mysql.createConnection(config);
    const sql = `INSERT INTO people(name) VALUES (?)`;

    await connection.query(sql, [faker.person.fullName()]);
    await connection.end();
  }

  async lerNomes() {
    const connection = await mysql.createConnection(config);
    const sql = `SELECT name FROM people`;
    const result = await connection.query(sql);
    return result[0].map((linhas) => linhas.name);
  }
}

import "dotenv/config";
import express from "express";
import { PessoaRepository } from "./PessoaRepository.js";

const app = express();

const repository = new PessoaRepository();

app.get("/", async (req, res) => {
  try {
    await repository.inserirNomeNaTabela();
    const nomes = await repository.lerNomes();

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${nomes.map((nome) => `<li>${nome}</li>`).join("")}
      </ul>
   `);
  } catch (err) {
    console.error(err);
    res.send("Erro ao inserir nome na tabela: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

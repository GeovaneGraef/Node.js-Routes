// Importa o EXPRESS para dentro do projeto
const express = require("express");
const server = express();
server.use(express.json());

const projects = [];

// Listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Listar um único usuário
server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  return res.json(projects[id]);
});

// Cadastrar um novo projeto
server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };
  projects.push(project);
  return res.json(projects);
});

// Segundo commit
server.listen(3000);

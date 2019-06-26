// Importa o EXPRESS para dentro do projeto
const express = require("express");
const server = express();
server.use(express.json());

const projects = [];

// MiddleWare que verifica se o ID foi informado para cadastro
function CheckProjectSend(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "O id do projeto não existe!" });
  }

  return next();
}

// MiddleWare que verifica se o ID existe para que seja alterado
function CheckIdExists(req, res, next) {
  if (!projects[req.params.id]) {
    return res
      .status(400)
      .json({ error: "O ID informado não foi encontrado!" });
  }

  return next();
}

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
server.post("/projects", CheckProjectSend, (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };
  projects.push(project);
  return res.json(projects);
});

// Alterar projeto
server.put("/projects/:id", CheckIdExists, (req, res) => {
  const { tasks } = req.body;
  const { id } = req.params;
  projects[id] = { id, tasks };
  return res.json(projects);
});

// Deletar Projseto
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.json(projects);
});

server.listen(3000);

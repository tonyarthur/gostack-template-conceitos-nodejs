const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositor = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositor);

  return response.json(repositor);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorIndex = repositories.findIndex(
    (repositor) => repositor.id === id
  );

  if (repositorIndex < 0)
    return response.status(400).json({ error: "repositor not found" });

  const repositor = {
    ...repositories[repositorIndex],
    title,
    url,
    techs,
  };
  repositories[repositorIndex] = repositor;

  return response.json(repositor);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorIndex = repositories.findIndex(
    (repositor) => repositor.id === id
  );

  if (repositorIndex < 0)
    return response.status(400).json({ error: "repositor not found" });

  repositories.splice(repositorIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorIndex = repositories.findIndex(
    (repositor) => repositor.id === id
  );

  if (repositorIndex < 0)
    return response.status(400).json({ error: "repositor not found" });

  const repository = repositories[repositorIndex];

  repository.likes += 1;

  return response.send(repository);
});

module.exports = app;

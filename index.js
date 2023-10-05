const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

const swaggerDocument = YAML.load("./openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
});

app.listen(port, () => {
  console.log("Server OK");
});

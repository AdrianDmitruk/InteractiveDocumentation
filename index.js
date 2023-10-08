const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const port = 3000;


const openapiSpecification = YAML.load("openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.use(express.json());

const books = [
  { id: 1, title: "Книга", author: "Автор" },
  { id: 2, title: "Книга", author: "Автор" },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Книга не найдена" });
  }
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json({ message: "Книга успешно добавлена" });
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books[index] = updatedBook;
    res.json({ message: "Книга успешно обновлена" });
  } else {
    res.status(404).json({ error: "Книга не найдена" });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: "Книга успешно удалена" });
  } else {
    res.status(404).json({ error: "Книга не найдена" });
  }
});

app.listen(port, () => {
  console.log(`Server OK`);
});

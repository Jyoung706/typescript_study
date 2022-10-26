import express from "express";
import "dotenv/config";
import { Post } from "./class/class";

const app = express();

app.use(express.json());

app.get("/ping", (_, res) => {
  res.json("pong");
});

app.post("/post", async (req, res) => {
  const { name, content } = req.body;
  const post = new Post(name, content);
  const data = await post.create(name, content);

  res.json(data);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = new Post(id);
  const data = await post.read(id);
  res.json(data);
});

app.patch("/post", (req, res) => {
  const data = req.body;
  const post = new Post(data.id, data.name, data.content);
  post.update(data.id, data.name, data.content);
  res.json("success");
});

app.delete("/post/:id", (req, res) => {
  const { id } = req.params;
  const post = new Post(id);
  post.delete(id);
  res.json();
});

app.listen(3000);

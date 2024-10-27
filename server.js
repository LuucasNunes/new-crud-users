import express from "express";
import { PrismaClient } from "@prisma/client/";

const prisma = new PrismaClient()

const app = express();
app.use(express.json())


// Métodos HTTP´s, Endpoints Users, request e responses
const users = []
app.post("/users", (req, res) => {
  users.push(req.body)
  res.status(201).json(req.body); //Retorno de Status do nosso post
});

app.get("/users", (req, res) => {
  res.status(200).json(users); //Retorno de status do nosso get
});

app.listen(3000, () => {
  console.log("--> O server está de pé!!! :DD");
}); //Localhost do app, se necessário pode trocar a porta

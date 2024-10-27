import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json())


// Métodos HTTP´s, Endpoints Users, request e responses assíncronos
const users = []
app.post("/users", async (req, res) => {

//Promisse para aguardar interação com o db
 await prisma.user.create({ 
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  })

  users.push(req.body)

  res.status(201).json(req.body); //Retorno de Status do nosso post
});

app.get("/users", async (req, res) => {
  
  const users = await prisma.user.findMany() //Promisse para aguardar interação com o db

  res.status(200).json(users); //Retorno de status do nosso get

});

app.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)){
    return res.status(400).json({ error: "ID deve ser um valor Int." });
  }
  try {
  //Promisse para aguardar interação com o db
   const updateUser = await prisma.user.update({ 
    where: { 
      id: userId //Passando a váriavel do userId convertida para um INT, como solicitado na Url 
    },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      }
    });
    users.push(req.body)
    res.status(201).json(updateUser); //Retorno de Status da nossa edição de usuário
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ error: "Um erro ocorreu durante a atualização de usuário." });
  }
  });
 

app.listen(3000, () => {
  console.log("--> O server está de pé!!! :DD");
}); //Localhost do app, se necessário pode trocar a porta

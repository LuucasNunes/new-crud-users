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
      status: req.body.status || 'ACTIVE'
    }
  })

  users.push(req.body)

  res.status(201).json(req.body); //Retorno de Status do nosso post
});

app.get("/users", async (req, res) => {
  try {
    const { id, email, name, age } = req.query;

    // Construção de filtros em forma de objeto 
    const filters = {};
    if (id) filters.id = parseInt(id); // Convertendo o ID para número, se fornecido
    if (email) filters.email = email;
    if (name) filters.name = name;
    if (age) filters.age = parseInt(age); // Convertendo a Idade para número, se fornecido

    // Busca com filtros aplicados
    const users = await prisma.user.findMany({
      where: filters
    });

    res.status(200).json(users); // Retorna os usuários filtrados
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
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
    res.status(200).json(updateUser); //Retorno de Status da nossa edição de usuário
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: "Um erro ocorreu durante a atualização de usuário." });
  }
  });

  app.get("/users/status", async (req, res) => { //Endpoint de Get Status
    try {
      const activeUsers = await prisma.user.findMany({
        where: {
          status: 'ACTIVE'
        }
      });
      res.status(200).json(activeUsers);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Ocorreu um erro ao recuperar os usuários ativos." });
    }
  });
  
  app.patch("/users/:id/status", async (req, res) => { //Atualização de Status
    const userId = parseInt(req.params.id);
    const { status } = req.body;
  
    if (status !== 'ACTIVE' && status !== 'INACTIVE') {
      return res.status(400).json({ error: "Status inválido." });
    }
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status }
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Um erro ocorreu ao relizar a atualização de status." });
    }
  });
  

app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)){
    return res.status(400).json({ error: "ID deve ser um valor Int." });
  }
  try {
  //Promisse para aguardar interação com o db
   const deleteUser = await prisma.user.delete({ 
    where: { 
      id: userId //Passando a váriavel do userId convertida para um INT, como solicitado na Url 
    }
    });

    res.status(200).json(deleteUser); //Retorno de Status da nossa edição de usuário
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ error: "Um erro ocorreu durante a exclusão do usuário." });
  }
  });
 

app.listen(3000, () => {
  console.log("--> O server está de pé!!! :DD");
}); //Localhost do app, se necessário pode trocar a porta

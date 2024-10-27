import express from "express";

const app = express();
app.use(express.json())


// Métodos HTTP´s, Endpoints Users, request e responses
const users = []
app.post("/users", (req, res) => {
  console.log(req.body)
  users.push(req.body)
  res.send("Request funcionou!");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("--> O server está de pé!!! :DD");
}); //Localhost do app, se necessário pode trocar a porta

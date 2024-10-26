import e from "express";

const app = e();

// Métodos HTTP´s, Endpoints Users, request e responses
app.get("/users", (req, res) => {
  res.send("Response funcionou!");
});

app.listen(3000, () => {
  console.log('--> O server está de pé!!! :DD')
}); //Localhost do app, se necessário pode trocar a porta

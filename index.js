const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/", (req, res) => {
  res.send("Hello World");
})

app.get("/users", (req, res) => {
  res.send(users);
});
 
app.get("/users/first", (req, res) => {
  let firstUser = users[0];
  res.send(firstUser);
});
 
app.get("/users/last", (req, res) => {
  let lastUser = users[users.length - 1];
  res.send(lastUser);
});
 
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});
 
app.get("/users/city/:city", (req, res) => {
  let city = req.params.city;
  let usersInCity = users.filter((el) => el.address && el.address.city === city);
  res.send(usersInCity);
});
 
app.get("/users/company/:company", (req, res) => {
  let company = req.params.company;
  let usersInCompany = users.filter((el) => el.company && el.company.name === company);
  res.send(usersInCompany);
})
 
app.get("/users/:id/street", (req, res) => {
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user.address.street);
});
 
app.post("/users", (req, res) => {
  let name = req.body.name;
  let age = req.body.age;

  let addUser = { name, age };
  users.push(addUser);

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});
 
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let age = req.body.age;

  let user = users.find((el) => el.id === parseInt(id));
  user.name = name;
  user.age = age;

  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});
 
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
 
  let index = users.findIndex((el) => el.id === parseInt(id));

  if (index !== -1) {
    users.splice(index, 1);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send({ success: true });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

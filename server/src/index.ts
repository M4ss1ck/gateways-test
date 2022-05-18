import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(bodyParser.json({ type: "application/json" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/gateways", async (req, res) => {
  console.log("GET /gateways");
  const gates = await prisma.gateway.findMany({
    include: { peripherals: true },
  });
  console.log(gates);
  res.json(gates);
});

app.get("/gateways/:id", async (req, res) => {
  const { id } = req.params;
  const gates = await prisma.gateway.findUnique({
    where: { id: id },
    include: { peripherals: true },
  });
  console.log(gates);
  res.json(gates);
});

app.post("/post", async (req, res) => {
  console.log("Got body: ", req.body);
  // const { name, ip } = JSON.parse(req.body);
  // const post = await prisma.gateway
  //   .create({
  //     data: {
  //       name: name,
  //       ip: ip,
  //     },
  //   })
  //   .catch((e) => console.log(e));
  // res.json(post);
});

app.put("/gateway/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ip } = req.body;
  // TODO validate ip with regex
  const post = await prisma.gateway.update({
    where: { id: id },
    data: {},
  });
  res.json(post);
});

app.delete("/device/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.peripheral.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

app.listen(3001);
console.log("Server running on port 3001");

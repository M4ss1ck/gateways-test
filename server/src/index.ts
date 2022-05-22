import express from "express";
import bodyParser from "body-parser";
import { Peripheral, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(bodyParser.json({ type: "application/json" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/gateway/list", async (req, res) => {
  const gateways = await prisma.gateway.findMany({
    include: { peripherals: true },
  });
  res.json(gateways);
});

app.get("/gateway/:id", async (req, res) => {
  const { id } = req.params;
  const gates = await prisma.gateway
    .findUnique({
      where: { id: id },
      include: { peripherals: true },
    })
    .catch((e) => console.error(e));
  res.json(gates);
});

app.post("/gateway/new", async (req, res) => {
  const { name, ip, peripherals } = req.body;
  if (
    ip &&
    ip.match(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    )
  ) {
    const gateways =
      peripherals?.length > 0 && peripherals.length <= 10
        ? await prisma.gateway
            .create({
              data: {
                name: name,
                ip: ip,
                peripherals: {
                  connectOrCreate: peripherals.map((peripheral: Peripheral) => {
                    return {
                      where: { uid: peripheral.uid },
                      create: {
                        uid: peripheral.uid,
                        vendor: peripheral.vendor,
                        status: peripheral.status,
                        dateCreated: peripheral.dateCreated,
                      },
                    };
                  }),
                },
              },
              include: { peripherals: true },
            })
            .catch((e) => console.log(e))
        : peripherals.length <= 10
        ? await prisma.gateway
            .create({
              data: {
                name: name,
                ip: ip,
              },
            })
            .catch((e) => console.log(e))
        : { error: "Too many peripheral devices" };
    res.json(gateways);
  } else {
    const error = { error: "Invalid IP address" };
    res.json(error);
  }
});

app.post("/device/new", async (req, res) => {
  const { uid, vendor, dateCreated, status, id } = req.body;
  const count = await prisma.peripheral.count({
    where: {
      gatewayId: id,
    },
  });
  if (count < 10) {
    const peripheral = await prisma.peripheral
      .create({
        data: {
          uid: uid,
          vendor: vendor,
          dateCreated: dateCreated,
          status: status,
          gateway: { connect: { id: id } },
        },
      })
      .catch((e) => console.log(e));
    const parentGateway = await prisma.gateway.findUnique({
      where: { id: id },
      include: { peripherals: true },
    });
    if (parentGateway?.peripherals) {
      res.json(parentGateway?.peripherals);
    } else {
      res.json({ error: "No peripherals found" });
    }
  } else {
    const error = { error: "Too many peripheral devices" };
    res.json(error);
  }
});

app.delete("/device/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPeripheral = await prisma.peripheral
    .delete({
      where: {
        id: id,
      },
    })
    .catch((e) => console.log(e));
  const parentGateway = await prisma.gateway.findUnique({
    where: { id: deletedPeripheral?.gatewayId },
    include: { peripherals: true },
  });
  if (parentGateway?.peripherals) {
    res.json(parentGateway?.peripherals);
  } else {
    res.json({ error: "No peripherals found" });
  }
});

app.listen(3001);
console.log("Server running on port 3001");

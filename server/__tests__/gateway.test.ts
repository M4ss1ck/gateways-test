import request from "supertest";
import { app, prisma } from "../src/index";

jest.setTimeout(30000);

afterAll(async () => {
  await prisma.$disconnect();
});

let gatewayID = "";

const badGateway = {
  name: "Test gateway",
  ip: "23.368.1.28",
  peripherals: [
    {
      uid: 1234,
      vendor: "Microsoft",
      dateCreated: "2022-05-22T04:21:04.914Z",
      status: "online",
    },
  ],
};

const goodGateway = {
  name: "Test gateway",
  ip: "192.168.1.28",
  peripherals: [
    {
      uid: 1234,
      vendor: "Microsoft",
      dateCreated: "2022-05-22T04:21:04.914Z",
      status: "online",
    },
  ],
};

test("should return a list of gateways", async () => {
  const response = await request(app)
    .get("/gateway/list")
    .expect("Content-Type", /json/)
    .expect(200);

  expect(response.body).toBeDefined();
});

test("should return an error if fails to validate the ip address", async () => {
  const response = await request(app).post("/gateway/new").send(badGateway);

  expect(response.body.error).toEqual("Invalid IP address");
});

test("a gateway is added successfully", async () => {
  const response = await request(app).post("/gateway/new").send(goodGateway);
  gatewayID = response.body.id;
  expect(response.body.name).toEqual("Test gateway");
  expect(response.body.ip).toEqual("192.168.1.28");
});

test("should return the gateway info based on its id", async () => {
  const response = await request(app)
    .get(`/gateway/${gatewayID}`)
    .expect("Content-Type", /json/)
    .expect(200);

  expect(response.body).toBeDefined();
  expect(response.body.name).toEqual("Test gateway");
});

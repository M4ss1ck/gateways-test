import { MockContext, Context, createMockContext } from "../context";
import { app, prisma } from "../src/index";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("should create new gateway ", async () => {
  const gateway = {
    id: 1,
    name: "Rich",
    email: "hello@prisma.io",
    acceptTermsAndConditions: true,
  };
});

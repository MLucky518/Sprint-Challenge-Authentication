const supertest = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration testing", () => {
  it("POST /api/auth/register", async () => {
    const user = {
      username: "miguel",
      password: "blibbity",
    };

    const res = await supertest(server).post("/api/auth/register").send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("miguel");
    expect(res.type).toBe("application/json");
  });

  it("POST /api/auth/login",async  () => {
    const user = {
      username: "userFours",
      password: "passwordfours",
    };
    const userReg = await supertest(server).post("/api/auth/register").send(user);
    expect(userReg.statusCode).toBe(201);
    // Attempt login

     const login = await supertest(server).post("/api/auth/login").send(user);
     expect(login.statusCode).toBe(200);
     expect(login.type).toBe("application/json");
     expect(login.headers["set-cookie"]).toBeDefined(); // token cookie
  });

  it("DELETE /api/auth/logout", async () =>{
      const res = await supertest(server).delete("/api/auth/logout");
      expect(res.statusCode).toBe(204);
  })
});

describe("test jokes router", () =>{
    it("GET /api/jokes" ,async () =>{
       
          const res = await supertest(server).get("/api/jokes")

          expect(res.body.message).toMatch(/invalid/i)
    })
})

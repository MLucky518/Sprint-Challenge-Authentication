const supertest = require("supertest");
const server = require("../api/server");


test("GET /", async () =>{
    const res = await supertest(server).get("/");
    
    expect(res.body.message).toBe("Welcome!!!");
    expect(res.body.message).toMatch(/!/i); 
    expect(res.statusCode).toBe(200);
})
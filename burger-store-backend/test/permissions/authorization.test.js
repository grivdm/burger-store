// const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");
const session = require("supertest-session");

// Test Authorization
describe.only("Authorization", () => {
  before(async () => {
    await User.deleteMany({});

    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
  });

  beforeEach(() => {
    testSession = session(app); // initialize test session
  });
  afterEach(async () => {
    // testSession.cookies = {};// clear cookies
  });
  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("create user session for valid user", async () => {
    const res = await testSession.post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    assert.equal(res.status, 200);
    assert.equal(res.text, "OK");
    // check cookie
    const cookie = testSession.cookies[0];
    assert.equal(cookie.name, "connect.sid");
    assert.exists(cookie.value);

    const res1 = await testSession.get("/auth/user");

    assert.equal(res1.status, 200);
    assert.equal(res1.body.name, "Test User");
  });

  it("does not authorize a user with invalid email", async () => {
    const res = await testSession.post("/auth/login").send({
      email: "differenttest@example.com",
      password: "password123",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.message, "Invalid email or password");
  });

  it("does not authorize a user with invalid password", async () => {
    const res = await testSession.post("/auth/login").send({
      email: "test@example.com",
      password: "differrentpassword123",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.message, "Invalid email or password");
  });
  it("does not allow to access a protected route", async () => {
    const res = await testSession.get("/auth/user");
    assert.equal(res.status, 401);
    assert.equal(res.body.message, "Unauthorized");
  });
  it("checks if a user is logged in", async () => {
    await testSession.post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    const res = await testSession.get("/auth/user");
    assert.equal(res.status, 200);
    assert.equal(res.body.name, "Test User");
  });
  it("logs out a user", async () => {
    await testSession.post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    const res = await testSession.post("/auth/logout");
    assert.equal(res.status, 200);
    assert.equal(res.text, "OK");

    const res1 = await testSession.get("/auth/user");
    assert.equal(res1.status, 401);
  });
});

const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");

describe("User Route", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 201);
  });

  it("return an error when name field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("return an error when name field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("return an error when email field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("return an error when password field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: "test@example.com",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("create a user with a unique email", async () => {
    let res = await request(app)
      .post("/users")
      .send({
        name: "Test User 1",
        email: "test1@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 201);

    res = await request(app)
      .post("/users")
      .send({
        name: "Test User 2",
        email: "test1@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
    assert.equal(res.body.error, "Email already exists");
  });

  it("get all users", async () => {
    const users = [
      {
        name: "Test User1",
        email: "test1@example.com",
        password: "password123",
      },
      {
        name: "Test User2",
        email: "test2@example.com",
        password: "password123",
      },
    ];
    await User.insertMany(users);
    const res = await request(app)
      .get("/users")
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.isArray(res.body);
    assert.equal(res.body.length, 2);
  });

  it("get a single user by id", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res = await request(app)
      .get(`/users/${user._id}`)
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.equal(res.body.name, "Test User");
    assert.equal(res.body.email, "test@example.com");
  });


  it("delete a user by id", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res = await request(app).delete(`/users/${user._id}`);
    assert.equal(res.status, 204);
  });
});

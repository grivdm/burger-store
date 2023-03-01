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

  it("creates a user", async () => {
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

  it("updates a user by id", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    const res = await request(app)
      .put(`/users/${savedUser._id}`)
      .send({
        name: "Test User Updated",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.equal(res.body.name, "Test User Updated");
  });

  it("returns an error when name field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("returns an error when email field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        password: "password123",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("returns an error when password field is missing", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: "test@example.com",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });

  it("checks if a user has an unique email", async () => {
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
    assert.equal(res.body.message, "Email already exists");
  });

  it("gets all users", async () => {
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

  it("gets a single user by id", async () => {
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

  it("returns an error if user's ID is incorrect", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res = await request(app)
      .get(`/users/notid`)
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
    assert.equal(res.body.message, "Invalid ID");
  });

  it("deletes a user by id and return an error because of user's ID is not found", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res1 = await request(app).delete(`/users/${user._id}`);
    assert.equal(res1.status, 204);

    const res = await request(app)
      .get(`/users/${user._id}`)
      .set("Accept", "application/json");
    assert.equal(res.status, 404);
    assert.equal(res.body.message, "User not found");
  });

  it("gets user's orders by id", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res = await request(app)
      .get(`/users/${user._id}/orders`)
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.isArray(res.body.orders);
  });

  it("gets user's addresses by id", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res = await request(app)
      .get(`/users/${user._id}/addresses`)
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.isArray(res.body.addresses);
  });

  it("creates a new address for a user", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const res1 = await request(app)
      .post(`/users/${user._id}/addresses`)
      .send({
        address: "Test Address",
      })
      .set("Accept", "application/json");

    assert.equal(res1.status, 201);
    assert.equal(res1.body.address, "Test Address");
    const res2 = await request(app)
      .get(`/users/${user._id}/addresses`)
      .set("Accept", "application/json");
    assert.equal(res2.status, 200);
    assert.equal(res2.body.addresses.length, 1);
    assert.equal(res2.body.addresses[0].address, "Test Address");
  });
});

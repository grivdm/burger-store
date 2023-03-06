const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");
const session = require("supertest-session");

describe("Roles", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();

    const admin = new User({
      name: "Test Admin",
      email: "testadmin@example.com",
      password: "password123",
      role: "admin",
    });
    await admin.save();
  });

  beforeEach(() => {
    testSession = session(app); // initialize test session
  });
  afterEach(async () => {
    testSession.cookies = {}; // clear cookies
  });
  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should allow admin to access admin route", async () => {
    await testSession.post("/auth/login").send({
      email: "testadmin@example.com",
      password: "password123",
    });
    const res = await testSession.get("/auth/admin");
    assert.equal(res.status, 200);
  });

  it("does not allow consumer to access admin route", async () => {
    await testSession.post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    const res = await testSession.get("/auth/admin");
    assert.equal(res.status, 401);
  });

  it("does not allow unauthenticated user to access admin route", async () => {
    const res = await testSession.get("/auth/admin");
    assert.equal(res.status, 401);
  });
});

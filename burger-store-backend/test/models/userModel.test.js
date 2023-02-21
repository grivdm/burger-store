const assert = require("chai").assert;
const mongoose = require("mongoose");
const User = require("../../models/user");
const dbConfig = require("../../config/database");
mongoose.set("strictQuery", false);

describe("User Model", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("save a user", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    const savedUser = await User.findOne({ email: "test@example.com" });
    assert.equal(savedUser.name, "Test User");
    assert.equal(savedUser.email, "test@example.com");
    assert.equal(savedUser.role, "customer");
    assert.strictEqual(savedUser.isActive, false);
    
  });
  it("not allow missing name field ", async () => {
    const user = new User({
      email: "test@example.com",
      password: "password123",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.name);
    assert.property(error.errors, "name", "Name field is missing");
  });
  it("not allow missing password field", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
    });
    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.password);
    assert.property(error.errors, "password", "Password field is missing");
  });
  it("save a user with a unique email", async () => {
    const user1 = new User({
      name: "Test User 1",
      email: "test1@example.com",
      password: "password123",
    });
    const user2 = new User({
      name: "Test User 2",
      email: "test1@example.com",
      password: "password123",
    });
    let error;
    try {
      await user1.save();
      await user2.save();
    } catch (err) {
      error = err;
    }
    assert.isDefined(error);
    assert.equal(error.code, 11000);
    assert.equal(error.keyValue.email, "test1@example.com");
  });
  it("update a user's name", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    savedUser.name = "New Name"
    await savedUser.save()
    const updatedUser = await User.findById(savedUser._id)
    assert.isDefined(updatedUser);
    assert.equal(updatedUser.name, "New Name");
  });
  it("not allow name longer than 50 characters", async () => {
    const user = new User({
      name: "a".repeat(51),
      email: "test@example.com",
      password: "password",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.name);
  });
  it("not allow password shorter than 6 characters", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "12345",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.password);
  });
  it("not allow invalid email", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example",
      password: "12345",
    });

    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.email);


  });
});

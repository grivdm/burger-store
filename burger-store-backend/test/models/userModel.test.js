const assert = require("chai").assert;
const mongoose = require("mongoose");
const User = require("../../models/user");
const Order = require("../../models/order");
const Address = require("../../models/address");
const dbConfig = require("../../config/database");
mongoose.set("strictQuery", false);

// Test User Model
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
    assert.isUndefined(savedUser.password);
    
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
  // it("update a user's email", async () => {
  //   const user = new User({
  //     name: "Test User",
  //     email: "test@example.com",
  //     password: "password123",
  //   });
  //   const savedUser = await user.save();
  //   savedUser.email = "test1@example.com"
  //   const updatedUser = await savedUser.save()
  //   console.log(updatedUser)

  // });
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
  it("create and show user's orders", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    const order = new Order({
      user: savedUser._id,
      items: [{ product: mongoose.Types.ObjectId(), quantity: 1 }],
      total: 10,
    });
    await order.save();
    const userOrders = await User.findById(savedUser._id).populate("orders");
    assert.isDefined(userOrders);
    assert.equal(userOrders.orders.length, 1);
    assert.equal(userOrders.orders[0].total, 10);
  });
  it("create and show user's addresses", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const savedUser = await user.save();

    const address = new Address({
      user: savedUser._id,
      address: "Test Street",
    });
    await address.save();
    const userAddresses = await User.findById(savedUser._id).populate("addresses");
    assert.isDefined(userAddresses);
    assert.equal(userAddresses.addresses.length, 1);
    assert.equal(userAddresses.addresses[0].address, "Test Street");

    const address2 = new Address({
      user: savedUser._id,
      address: "Test Street 2",
    });
    await address2.save();
    const userAddresses2 = await User.findById(savedUser._id).populate("addresses");
    assert.isDefined(userAddresses2);
    assert.equal(userAddresses2.addresses.length, 2);
    assert.equal(userAddresses2.addresses[1].address, "Test Street 2");


  });
  it('check if password hashed and isMatch', async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    assert.notEqual(user.password, "password123");
    const isMatch = await user.comparePassword("password123");
    assert.isTrue(isMatch);
  });
  it('check if changed password is hashed and isMatch', async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    await user.save();
    user.password = "password1234"; // change password
    await user.save();
    assert.notEqual(user.password, "password1234");
    const isMatch = await user.comparePassword("password1234");
    assert.isTrue(isMatch);

  });

});

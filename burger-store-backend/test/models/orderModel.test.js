const mongoose = require("mongoose");
const chai = require("chai");
const assert = chai.assert;
const Order = require("../../models/order");
const dbConfig = require("../../config/database");
// mongoose.set("strictQuery", false);

describe("Order Model", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });

  afterEach(async () => {
    await Order.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("save an order", async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      items: [
        {
          product: mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      total: 10,
    });
    const savedOrder = await order.save();
    assert.equal(savedOrder.user, order.user);
    assert.equal(savedOrder.items[0].product, order.items[0].product);
    assert.strictEqual(savedOrder.items[0].quantity, 1);
    assert.strictEqual(savedOrder.total, 10);
    assert.equal(savedOrder.status, "pending");
    assert.equal(savedOrder.address, null);
  });

  it("not save an order without a user", async () => {
    const order = new Order({
      items: [
        {
          product: mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      status: "pending",
      total: 10,
    });

    let error;

    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.user);
    assert.property(error.errors, "user", "User value is required");
  });

  it("not save an order without items", async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      status: "pending",
      total: 10,
    });

    let error;

    try {
      await order.save();
    } catch (err) {
      error = err;
    }
    assert.isDefined(error);
    assert.isDefined(error.errors.items);
    assert.property(error.errors, "items", "Items value is required");
  });

  it("not save an order without a total", async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      items: [
        {
          product: mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      status: "pending",
    });

    let error;

    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.total);
    assert.property(error.errors, "total", "Total value is required");
  });

  it("not save an order with a negative total", async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      items: [
        {
          product: mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      status: "pending",
      total: -10,
    });
    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }
    assert.isDefined(error);
    assert.isDefined(error.errors.total);
    // assert.property(error.errors, "total", "Total field is negative");
  });
  it(" save an order with adress", async () => {
    const order = new Order({
      user: mongoose.Types.ObjectId(),
      items: [
        {
          product: mongoose.Types.ObjectId(),
          quantity: 1,
        },
      ],
      status: "pending",
      total: 10,
      address: mongoose.Types.ObjectId(),
    });
    const savedOrder = await order.save();
    assert.equal(savedOrder.user, order.user);
    assert.equal(savedOrder.items[0].product, order.items[0].product);
    assert.strictEqual(savedOrder.items[0].quantity, 1);
    assert.strictEqual(savedOrder.total, 10);
    assert.equal(savedOrder.status, "pending");
    assert.equal(savedOrder.address, order.address);
  });
});

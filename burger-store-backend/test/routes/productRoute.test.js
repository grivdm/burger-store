const request = require("supertest");
const app = require("../../app");
const Product = require("../../models/product");
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");

describe("Product Route", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });
  afterEach(async () => {
    await Product.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("create a product", async () => {
    const res = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        description: "Description 1",
        price: 10.0,
        image: "image1.jpg",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 201);
  });
  it("return an error when product field is missing", async () => {
    const res = await request(app)
      .post("/products")
      .send({
        // name: "Product 1",
        description: "Description 1",
        price: 10.0,
        image: "image1.jpg",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });
  it("get all products", async () => {
    const products = [
      {
        name: "Product 1",
        description: "Description 1",
        price: 10.0,
        image: "image1.jpg",
      },
      {
        name: "Product 2",
        description: "Description 2",
        price: 20.0,
        image: "image2.jpg",
      },
    ];
    await Product.insertMany(products);
    const res = await request(app)
      .get("/products")
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.isArray(res.body);
    assert.equal(res.body.length, 2);
  });
  it("get a product by id", async () => {
    const product = new Product({
        name: "Product 1",
        description: "Description 1",
        price: 10.0,
        image: "image1.jpg",
    });
    await product.save();
    const res = await request(app)
      .get(`/products/${product._id}`)
      .set("Accept", "application/json");
    assert.equal(res.status, 200);
    assert.equal(res.body.name, "Product 1");
    assert.equal(res.body.description, "Description 1");
    assert.equal(res.body.price, 10.0);
    assert.equal(res.body.image, "image1.jpg");
  });
  it("delete a product by id", async () => {
    const product = new Product({
        name: "Product 1",
        description: "Description 1",
        price: 10.0,
        image: "image1.jpg",
    });
    await product.save();
    const res = await request(app).delete(`/products/${product._id}`);
    assert.equal(res.status, 204);
  });
  it("return an error when price is not numeric", async () => {
    const res = await request(app)
      .post("/products")
      .send({
        name: "Product 1",
        description: "Description 1",
        price: 'Not a number',
        image: "image1.jpg",
      })
      .set("Accept", "application/json");
    assert.equal(res.status, 400);
  });
});

const mongoose = require("mongoose");
const assert = require("chai").assert;
mongoose.set("strictQuery", false);
const Category = require("../../models/productCategory");
const dbConfig = require("../../config/database");

describe("Category Model", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });
  afterEach(async () => {
    await Category.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("save a new product category", async () => {
    const category = new Category({
      name: "Test Category",
      description: "This is a test category",
    });

    await category.save();
    const savedCategory = await Category.findOne({ name: "Test Category" });

    assert.equal(savedCategory.name, "Test Category");
    assert.equal(savedCategory.description, "This is a test category");
  });

  it("not allow missing name field", async () => {
    const category = new Category({
      description: "This is a test category",
    });

    let error;
    try {
      await category.save();
    } catch (err) {
      error = err;
    }

    assert.exists(error);
    assert.exists(error.errors.name);
  });

  it("update an existing product category", async () => {
    const category = new Category({
      name: "Test Category",
      description: "This is a test category",
    });

    const savedCategory = await category.save();

    savedCategory.name = "Updated Test Category";
    savedCategory.description = "This is an updated test category";

    const updatedCategory = await savedCategory.save();

    assert.equal(updatedCategory.name, "Updated Test Category");
    assert.equal(
      updatedCategory.description,
      "This is an updated test category"
    );
  });

  it("delete an existing product category", async () => {
    const category = new Category({
      name: "Test Category",
      description: "This is a test category",
    });

    const savedCategory = await category.save();

    await savedCategory.remove();

    const deletedCategory = await Category.findById(savedCategory._id);

    assert.isNull(deletedCategory);
  });

});

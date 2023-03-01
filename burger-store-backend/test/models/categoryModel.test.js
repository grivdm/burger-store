const mongoose = require("mongoose");
const assert = require("chai").assert;
mongoose.set("strictQuery", false);
const Category = require("../../models/productCategory");
const Product = require("../../models/product");
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

  // it("add a subcategory to an existing category and find it in db", async () => {
  //   const category = new Category({
  //     name: "Test Category",
  //     description: "This is a test category",
  //   });

  //   const savedCategory = await category.save();

  //   savedCategory.subcategories.push({
  //     name: "Test Subcategory",
  //     description: "This is a test subcategory",
  //   });

  //   const updatedCategory = await savedCategory.save();

  //   assert.equal(updatedCategory.subcategories.length, 1);
  //   assert.equal(updatedCategory.subcategories[0].name, "Test Subcategory");
  //   assert.equal(
  //     updatedCategory.subcategories[0].description,
  //     "This is a test subcategory"
  //   );
    
  //   const foundCategory = await Category.findById(savedCategory._id); 
  //   assert.equal(foundCategory.subcategories.length, 1);
  //   assert.equal(foundCategory.subcategories[0].name, "Test Subcategory");
  //   assert.equal(
  //     foundCategory.subcategories[0].description,
  //     "This is a test subcategory"
  //   );

  // });

  // it("add a product to an existing subcategory and find it in db", async () => {
  //   const category = new Category({
  //     name: "Test Category",
  //     description: "This is a test category",
  //     subcategories: "Test Subcategory"
  //   });
  //   const savedCategory = await category.save();
  //   const  product = new Product({
  //     name: "Test Product",
  //     description: "This is a test product",
  //     price: 10.99,
  //     category: "Test Subcategory",
  //   });
  //   const savedProduct = await product.save();
  //   assert.equal(savedProduct.category, "Test Subcategory");
  //   console.log(savedCategory.subcategories);
  //   assert.equal(savedCategory.subcategories[0].products.length, 1);
  //   assert.equal(savedCategory.subcategories[0].products[0].name, "Test Product");




  // });

});

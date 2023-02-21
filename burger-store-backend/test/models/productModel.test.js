const mongoose = require("mongoose");
const assert = require("chai").assert;
mongoose.set("strictQuery", false);
const Product = require("../../models/product");
const Category = require("../../models/productCategory");
const dbConfig = require("../../config/database");


describe("Product Model", () => {
  before(async () => {
    await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
  });
  afterEach(async () => {
    await Product.deleteMany({});
  });
  after(async () => {
    await mongoose.connection.close();
  });

  it("save a product", async () => {
    const category1 = await Category.findOne({name: 'category1'})
    const product = new Product({
      name: "Test product",
      description: "Test product description",
      price: 9.99,
      image: "test.jpg",
      category: mongoose.Types.ObjectId()
    });
    await product.save();
    const savedProduct = await Product.findOne({ name: "Test product" });
    assert.strictEqual(savedProduct.name, "Test product");
    assert.strictEqual(savedProduct.description, "Test product description");
    assert.strictEqual(savedProduct.price, 9.99);
    assert.strictEqual(savedProduct.image, "test.jpg");
    assert.exists(savedProduct.category);
  });
  it('update a product', async () => {
    const category1 = await Category.findOne({name: 'category1'})

    const product = new Product({
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
      image: "test.jpg",
      category: mongoose.Types.ObjectId()
    });
    const savedProduct = await product.save();
    const updatedProduct = await Product.findByIdAndUpdate(savedProduct._id, {
      name: 'Updated Product',
      price: 150
    }, { new: true });
    assert.isDefined(updatedProduct);
    assert.equal(updatedProduct.name, 'Updated Product');
    assert.equal(updatedProduct.price, 150);
  });
  it('delete a product', async () => {
    const product = new Product({
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
      image: "test.jpg",
      category: mongoose.Types.ObjectId()
    });
    const savedProduct = await product.save();
    const deletedProduct = await Product.findByIdAndDelete(savedProduct._id);
    assert.isDefined(deletedProduct);
    const foundProduct = await Product.findById(savedProduct._id);
    assert.isNull(foundProduct);
  });
  it('not save product without required fields', async () => {
    const product = new Product({
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
      image: "test.jpg"
    });
    try {
      await product.save();
    } catch (error) {
      assert.isDefined(error);
      assert.instanceOf(error, mongoose.Error.ValidationError);
      assert.property(error.errors, 'category');
    }
  });
  it('not save when a non-numeric price', async () => {
    const product = new Product({
      name: 'Product 3',
      description: 'Description for Product 3',
      price: 'Not a number',
      image: 'image.jpg',
      category: new mongoose.Types.ObjectId(),
    });

    let error;

    try {
      await product.save();
    } catch (err) {
      error = err;
    }

    assert.isDefined(error);
    assert.isDefined(error.errors.price);

  });
  it('should find products by category', async () => {
    const product1 = new Product({
      name: 'Product 1',
      description: 'Description of product 1',
      price: 100,
      image: "test.jpg",
      category: 'category1_id'
    });
    const product2 = new Product({
      name: 'Product 2',
      description: 'Description of product 2',
      price: 200,
      image: "test.jpg",
      category: 'category2_id'
    });
    const product3 = new Product({
      name: 'Product 3',
      description: 'Description of product 3',
      price: 300,
      image: "test.jpg",
      category: 'category1_id'
    });
    const savedProduct1 = await product1.save();
    const savedProduct2 = await product2.save();
    const savedProduct3 = await product3.save();
    const productsInCategory1 = await Product.find({ category: 'category1_id' });
    assert.isArray(productsInCategory1);
    assert.lengthOf(productsInCategory1, 2);
    assert.deepEqual(productsInCategory1[0]._id, savedProduct1._id);
    assert.deepEqual(productsInCategory1[1]._id, savedProduct3._id);
  });
});

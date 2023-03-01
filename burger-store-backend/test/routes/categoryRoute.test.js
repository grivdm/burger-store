const request = require("supertest");
const app = require("../../app");
const Category = require("../../models/productCategory");
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");

describe("Category Route", () => { 
    before(async () => {
        await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
    }); 
    afterEach(async () => {
        await Category.deleteMany({});
    }
    );
    after(async () => {
        await mongoose.connection.close();
    });

    it("create a category", async () => {
        const res = await request(app)
            .post("/categories")
            .send({
                name: "Category 1",
                description: "Description 1",
            })
            .set("Accept", "application/json");
        assert.equal(res.status, 201);
    });
    it("return an error when category field is missing", async () => {
        const res = await request(app)
            .post("/categories")
            .send({
                // name: "Category 1",
                description: "Description 1",
            })
            .set("Accept", "application/json");
        assert.equal(res.status, 400);
    }
    );
    it("get all categories", async () => {
        const categories = [
            {
                name: "Category 1",
                description: "Description 1",
            },
            {
                name: "Category 2",
                description: "Description 2",
            },
        ];
        await Category.insertMany(categories);
        const res = await request(app)
            .get("/categories")
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2);
    });
    it("get a category by id", async () => {
        const category = new Category({
            name: "Category 1",
            description: "Description 1",
        });
        await category.save();
        const res = await request(app)
            .get("/categories/" + category._id)
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
        assert.equal(res.body.name, "Category 1");
    });
    it("return an error when category id is invalid", async () => {
        const res = await request(app)
            .get("/categories/1")
            .set("Accept", "application/json");
        assert.equal(res.status, 400);
    }
    );
    it("return an error when category id is not found", async () => {
        const res = await request(app)
            .get("/categories/5e7a7b4f1c9d440000b4f3f9")
            .set("Accept", "application/json");
        assert.equal(res.status, 404);
    }
    );
    it("update a category", async () => {
        const category = new Category({
            name: "Category 1",
            description: "Description 1",
        });
        await category.save();
        const res = await request(app)
            .put("/categories/" + category._id)
            .send({
                name: "Category 1",
                description: "Description 1",
            })
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
    });
    
});
const request = require("supertest");
const app = require("../../app");
const Order = require("../../models/order");    
const assert = require("chai").assert;
const dbConfig = require("../../config/database");
const mongoose = require("mongoose");


describe("Order Route", () => {
    before( async () => {
        await mongoose.connect(dbConfig.test.databaseUri, dbConfig.test.options);
    });

    afterEach( async () => {
        await Order.deleteMany({});
    });

    after( async () => {
        await mongoose.connection.close();
    });


    it("create an order", async () => {
        const res = await request(app)
            .post("/orders")
            .send({
                user: mongoose.Types.ObjectId(),
                items: [
                    {
                        product: mongoose.Types.ObjectId(),
                        quantity: 1,
                    },
                ],
                total: 10,
            })
            .set("Accept", "application/json");
        assert.equal(res.status, 201);
    });

    it("return an error when order field is missing", async () => {
        const res = await request(app)
            .post("/orders")
            .send({
                // user: mongoose.Types.ObjectId(),
                items: [
                    {
                        product: mongoose.Types.ObjectId(),
                        quantity: 1,
                    },
                ],
                total: 10,
            })
            .set("Accept", "application/json");
        assert.equal(res.status, 400);
    });

    it("get all orders", async () => {
        const orders = [
            {
                user: mongoose.Types.ObjectId(),
                items: [
                    {
                        product: mongoose.Types.ObjectId(),
                        quantity: 1,
                    },
                ],
                total: 10,
            },
            {
                user: mongoose.Types.ObjectId(),
                items: [
                    {
                        product: mongoose.Types.ObjectId(),
                        quantity: 1,
                    },
                ],
                total: 10,
            },
        ];
        await Order.insertMany(orders);
        const res = await request(app)
            .get("/orders")
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2);
    });

    it("get an order by id", async () => {
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
        await order.save();
        const res = await request(app)
            .get("/orders/" + order._id)
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
        assert.equal(res.body._id, order._id.toString());
    });


    it("return an error when order id is invalid", async () => {
        const res = await request(app)
            .get("/orders/1")
            .set("Accept", "application/json");
        assert.equal(res.status, 400);
    }
    );
    
    it('delete an order by id', async () => {
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
        await order.save();
        const res = await request(app)
            .delete("/orders/" + order._id)
            .set("Accept", "application/json");
        assert.equal(res.status, 200);
    });

});  
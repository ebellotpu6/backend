const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const { SERVER_PORT } = require('./config');

const { notFound, handleError } = require("./middleware/handleErrors");

const app = express();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");
app.use(morgan("dev"));


const loginRouter = require("./resources/login/login.router");
app.use("/login", loginRouter);

const userRouter = require("./resources/user/user.router");
app.use("/users", userRouter);

const orderRouter = require("./resources/order/order.router");
app.use("/orders", orderRouter);

app.use(notFound);
app.use(handleError);

const startServer = async () => {
    await db.connect();
    app.listen(SERVER_PORT, () => {
        console.log(`Ecommerce API sercer listening on: ${SERVER_PORT}`);
    });
}

startServer();

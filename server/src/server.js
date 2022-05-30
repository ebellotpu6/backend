const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const { SERVER_PORT } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");
app.use(morgan("dev"));

const userRouter = require("./resources/user/user.router");
app.use("/users", userRouter);

const startServer = async () => {
    await db.connect();
    app.listen(SERVER_PORT, () => {
        console.log(`Ecommerce API sercer listening on: ${SERVER_PORT}`);
    });
}

startServer();

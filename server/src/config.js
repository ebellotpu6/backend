require("dotenv").config();

const checkEnvVar = (name) => {
    if(process.env[name] === undefined) throw new Error(`Undefined env. variable ${name}`);
    return process.env[name];
}

const DB_HOST = checkEnvVar('DB_HOST');
const DB_USER = checkEnvVar('DB_USER');

module.exports = {
    SERVER_PORT: checkEnvVar('SERVER_PORT'),
    MONGO_URL: `mongodb://admin:${DB_USER}@${DB_HOST}/ecommerce?authSource=admin`,
};
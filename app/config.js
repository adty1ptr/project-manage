require('dotenv').config();

module.exports = {
    serviceName : process.env.SERVICE_NAME,
    port: process.env.PORT,
    mode: process.env.ENV_MODE,
    secretKey: process.env.SECRET_KEY,

    // DB Config
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPort: process.env.DB_PORT,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
}
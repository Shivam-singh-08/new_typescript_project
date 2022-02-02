import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_HOST = process.env.MONGO_URL || 'mongodb://localhost:27017/Userdb';

const MONGO = {
    host: MONGO_HOST,
    options: MONGO_OPTIONS
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 9000;

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'ABCD';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'helloencrypted';

const SERVER = {
    hostName: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
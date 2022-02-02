import express from 'express';
import config from './config/config';
import logging from './config/logging';
import userRoutes from './routes/user.route';
import  connect  from './database/db.connect';

const NAMESPACE='server';

const app= express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(userRoutes);

app.listen(config.server.port, () => {
    connect();
    logging.info(NAMESPACE, `server running on ${config.server.hostName}:${config.server.port}`);
});
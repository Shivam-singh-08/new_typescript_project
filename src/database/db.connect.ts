import mongoose from 'mongoose';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'MONGODB';

const dbConnect = () => {
    mongoose
        .connect(config.mongo.host)
        .then((result) => {
            logging.info(NAMESPACE, `connected to MongoDB!`);
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
        });
};

export default dbConnect;

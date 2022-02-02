import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import User from '../model/user.model';
import jwt from 'jsonwebtoken';
import config from '../config/config';


const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUserById=(req: Request, res: Response, next: NextFunction) => {
    let userid=req.params.id;
    User.findById(userid)
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};


const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                
                if (result) {
                    const token = jwt.sign(
                        {
                            username: users[0].username
                        },
                        config.server.token.secret,
                        {
                            issuer: config.server.token.issuer,
                            algorithm: 'HS256',
                            expiresIn: '1h'
                        }
                    );
                    if (token) {
                        return res.status(200).json({
                            message: 'logged in successfully!',
                            token: token
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: 'user id or password mismatch'
                    });
                }

            
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    let userid=req.params.id;
    User.remove({ _id: { $eq: userid} })
        .then((users) => {
            return res.status(200).json({
                users: users,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};



export default { getAllUsers,getUserById,register, login, deleteUser};


import express from 'express';
import jwt from "jsonwebtoken";
import { jwtSecret } from './config.js';
import * as authController from './controllers/authentication.js';
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors({
    origin: 'https://taks4f.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: 'include',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://chatf-594d6adb216e.herokuapp.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
    })
);

const checkJwt = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
            return res.status(500).send("Failed to authenticate token");
        }

        req.userId = decoded.id;
        next();
    });
};

app.post('/deleteUsers', checkJwt, authController.deleteUsers);
app.post('/updateUserStatus', checkJwt, authController.updateUserStatus);
app.post('/blockUsers', checkJwt, authController.blockUsers);
app.get('/users', checkJwt, authController.getUsers);
app.post('/register', authController.register);
app.post('/', authController.login);
app.get('/user/:id', checkJwt, authController.getUser);

app.get('/', (req, res) => {
    res.send('Hello, Server!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
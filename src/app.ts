process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';
// Env files
import * as dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

//initialize express
import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import cors from 'cors';
import jwt from 'express-jwt';
import morgan from 'morgan';
import basicAuth from 'express-basic-auth';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';
import allowedRoutes from './routes/allowed.routes';

const processVars:any = process.env;
const { jwt_secret_key, api_docs_user, api_docs_password}:{
    jwt_secret_key: string, 
    api_docs_user: string, 
    api_docs_password: string
} = processVars;



const app: express.Application = express();

//JSON Support
app.use(express.json());

//morgan to development env
if(process.env.APP_ENV === 'development'){
    app.use(morgan('dev'));
}

//Container
loadContainer(app);

//CORS
app.use(cors());

//JWT
if (jwt_secret_key) {
    console.error({jwt_secret_key});
    app.use('/api/',
        jwt({
            secret: jwt_secret_key,
            algorithms: ['HS256']
        }).unless({ path: allowedRoutes })
    );
}
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'INVALID_TOKEN', message: 'Invalid token provided' });
    } else {
        next(err);
    }
});


//Controllers
app.use(loadControllers(
    'controllers/*.js',
    { cwd: __dirname }
));

const specs = swaggerJSDoc(options);
app.use('/api-docs', basicAuth({
    users: { [api_docs_user || '']: api_docs_password || ''},
    challenge: true,
}), swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

export { app };
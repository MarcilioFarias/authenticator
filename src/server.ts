import  Express from "express";
import dotenv from 'dotenv';
import path from "path";
import cors from 'cors';
import mainRoute from './routes/routes';

dotenv.config();

const server = Express();

server.use(cors());
server.use(Express.urlencoded({extended: true}));
server.use(Express.static(path.join(__dirname, '../public')));

server.use(mainRoute);

server.listen(process.env.PORT);

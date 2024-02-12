import { Router } from "express";
import * as apiController from '../controllers/api';
import { Auth } from "../middlewares/authenticate";

const routes = Router();

/*routes.get('/', apiController.test ); */
routes.get('/ping', apiController.ping);
routes.post('/register', apiController.register);
routes.post('/login', apiController.login);
routes.get('/list', Auth.private, apiController.list);
routes.get('/password', apiController.listPassword);


export default routes;
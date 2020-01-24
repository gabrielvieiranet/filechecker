import { Router } from 'express';

import MainController from './controllers/MainController';

const routes = new Router();

routes.get('/', MainController.index);
routes.get('/status', MainController.status);

export default routes;

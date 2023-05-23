import * as Router from 'koa-router';
import IndexController from './controllers/index.controller';
import UsersController from './controllers/users.controller';

const router = new Router();

router.get('/', IndexController.getIndex);

router.get('/users', UsersController.getUsers);

export default router;

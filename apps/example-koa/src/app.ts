import 'reflect-metadata';
import { useKoaServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { ErrorHandler } from './middlewares/ErrorHandler';
import { UserController } from './controllers/UserController';
import { app, port } from './server';

useContainer(Container);

const koaApp = useKoaServer(app, {
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [UserController],
  middlewares: [ErrorHandler]
});

koaApp.listen(port, () => {
  console.log(`🚀 App run on http://localhost:${port}`);
});

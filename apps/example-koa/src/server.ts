import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as helmet from 'koa-helmet';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as onerror from 'koa-onerror';

const app = new Koa();
const port = process.env.PORT || 3000;

onerror(app);
app.use(helmet());
app.use(cors());
app.use(json());
app.use(logger());
app.use(bodyParser());

export { app, port };

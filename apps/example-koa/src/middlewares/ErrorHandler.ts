import { KoaMiddlewareInterface, Middleware } from 'routing-controllers';
import { Context } from 'koa';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'before' })
export class ErrorHandler implements KoaMiddlewareInterface {
  async use(
    ctx: Context,
    next: (err?: Error) => Promise<unknown>
  ): Promise<void> {
    try {
      await next();
    } catch (error) {
      const { status = 500, code, message, origin = '' } = error;
      ctx.body = {
        code,
        message,
        error: message,
        errorOrigin: origin
      };
    }
  }
}

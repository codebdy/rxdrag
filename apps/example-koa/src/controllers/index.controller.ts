import { BaseContext } from 'koa';

export default class IndexController {

    public static async getIndex(ctx: BaseContext) {
        ctx.status = 200;
    }
}

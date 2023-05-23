import { BaseContext } from 'koa';

export default class UserController {

    public static async getUsers(ctx: BaseContext) {
        ctx.status = 200;
        ctx.body = [{ id: 1, name: 'hi' }];
    }
}
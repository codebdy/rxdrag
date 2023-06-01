import 'reflect-metadata';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete
} from 'routing-controllers';
import { Service, Inject } from 'typedi';
import UserService from '../services/UserService';
import { transformSuccessResponse } from '../libs';

@Service()
@JsonController()
export class UserController {
  @Inject()
  public userService: UserService;

  @Get('/users')
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return transformSuccessResponse(result);
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number) {
    const result = await this.userService.getUser(id);
    return transformSuccessResponse(result);
  }

  @Post('/user')
  async addUser(@Body() data: { name: string }) {
    const { name } = data || {};
    const result = await this.userService.addUser(name);
    return transformSuccessResponse(result);
  }

  @Delete('/users/:id')
  async remove(@Param('id') id: number) {
    const result = await this.userService.deleteUser(id);
    return transformSuccessResponse(result);
  }
}

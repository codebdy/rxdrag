import { Service, Inject } from 'typedi';
import { User } from '../models/User';
import { UserRepo } from '../repos/UserRepo';

@Service()
class UserService {
  @Inject()
  public userRepo: UserRepo;
  public async getAllUsers(): Promise<User[]> {
    const result = await this.userRepo.queryAll();
    return result;
  }
  public async getUser(id: number): Promise<User> {
    const result = await this.userRepo.query(id);
    return result;
  }
  public async addUser(username: string): Promise<User> {
    const result = await this.userRepo.add(username);
    return result;
  }
  public async deleteUser(id: number): Promise<User> {
    const result = await this.userRepo.delete(id);
    return result;
  }
}

export default UserService;

import { IActivity } from "../interfaces/activity";
import { ActivityFactories, IMinions } from "../interfaces/minions";

export class Minions implements IMinions{
  register(activities: ActivityFactories): void {
    throw new Error("Method not implemented.");
  }
  createActivity(activityName: string): IActivity {
    throw new Error("Method not implemented.");
  }
  
}
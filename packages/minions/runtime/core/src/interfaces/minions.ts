import { ActivityFactory, IActivity } from "./activity";

export type ActivityFactories = {
  [activityName: string]: ActivityFactory
}

export interface IMinions {
  register(activities: ActivityFactories): void
  createActivity<ActivityFactoryOptions>(activityName: string, options: ActivityFactoryOptions): IActivity
}
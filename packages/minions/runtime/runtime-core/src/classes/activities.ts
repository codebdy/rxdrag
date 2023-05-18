import { IActivity } from "../interfaces";

export type ActivityClass = { new(...args: any[]): IActivity }

export type ActivityClasses = {
  [activityName: string]: ActivityClass
}

export const activityConstructors: ActivityClasses = {}

export function activity(activityName: string): (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) => void {
  return function (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) {
    activityConstructors[activityName] = target;
  }
}


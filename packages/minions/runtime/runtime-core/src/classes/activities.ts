export type ActivityClass = { new(...args: any[]): {} }

export const activityConstructors: {
  [activityName: string]: ActivityClass
} = {}

export function activity(activityName: string): (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) => void {
  return function (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) {
    activityConstructors[activityName] = target;
  }
}


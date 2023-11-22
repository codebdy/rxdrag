/* eslint-disable @typescript-eslint/no-explicit-any */
import { IActivity } from "../interfaces";
export const DEFAULT_INPUT_NAME = "input"
export const DEFAULT_OUTPUT_NAME = "output"
export const EXCEPTION_OUTPUT_NAME = "exception"

export type ActivityClass = { new(...args: any[]): IActivity };
export interface IActivityInfo {
  target: ActivityClass,
  methodMap: { [inputName: string]: string },
  dynamicMethod?: string;
};

export type ActivityInfos = {
  [activityName: string]: IActivityInfo | undefined
};

const activityInfoArray: IActivityInfo[] = [];

export const activities: ActivityInfos = {};

export function Activity(activityName: string): (target: ActivityClass/*ClassDecoratorContext<ActivityClass>*/) => void {
  return function (target: ActivityClass) {
    let activityInfo = activityInfoArray.find(info => info.target === target)

    if (!activityInfo) {
      activityInfo = { target: target, methodMap: {} }
      activityInfoArray.push(activityInfo)
    }

    activities[activityName] = activityInfo;
    activityName === "system.debug" && console.log("==== class反射", activityName, activityInfo)
  }
}

//这个函数应该有Typescript的版本兼容问题，目前编译器是typescript4.x，但是eslint 像是配置的5.0
// InputHandler一定要用箭头函数，来解决this问题
export function Input(inputName: string = DEFAULT_INPUT_NAME): (target: any, propertyName: any, descriptor?: PropertyDescriptor) => void {

  return function (target: any, propertyName: any) {

    let activityInfo = activityInfoArray.find(info => info.target === target?.constructor)

    if (!activityInfo) {
      activityInfo = { target: target?.constructor, methodMap: {} }
      activityInfoArray.push(activityInfo)
    }

    activityInfo.methodMap[inputName] = propertyName;
  }
}

//动态输入
export function DynamicInput(target: any, propertyName: any): void  {
  let activityInfo = activityInfoArray.find(info => info.target === target?.constructor)

  if (!activityInfo) {
    activityInfo = { target: target?.constructor, methodMap: {} }
    activityInfoArray.push(activityInfo)
  }

  activityInfo.dynamicMethod = propertyName
}


import { IActivity } from "../interfaces";
import _ from "lodash"

export type ActivityClass = { new(...args: any[]): IActivity }

export interface IActivityInfo {
  target: ActivityClass,
  methodMap: { [inputName: string]: string },
}

export type ActivityInfos = {
  [activityName: string]: IActivityInfo
}

const activityInfoArray: IActivityInfo[] = []

export const activities: ActivityInfos = {}

export function Activity(activityName: string): (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) => void {
  return function (target: ActivityClass, context: ClassDecoratorContext<ActivityClass>) {
    let activityInfo = activityInfoArray.find(info=>info.target === target) 

    if(!activityInfo){
      activityInfo = { target:target, methodMap: {} }
      activityInfoArray.push(activityInfo)
    }

    activities[activityName] = activityInfo;
    activityName === "system.debug" && console.log("==== class反射", activityInfo)
  }
}

export type InputHandler = (inputValue: any) => void

//这个函数应该有Typescript的版本兼容问题，目前编译器是typescript4.x，但是eslint 像是配置的5.0
export function Input(inputName: string = "input"): (target: any, propertyName: any, descriptor?: PropertyDescriptor) => void {

  return function (target: any, propertyName: any, descriptor?: PropertyDescriptor) {

    let activityInfo = activityInfoArray.find(info=>info.target === target?.constructor) 

    if(!activityInfo){
      activityInfo = { target:target?.constructor, methodMap: {} }
      activityInfoArray.push(activityInfo)
    }

    activityInfo.methodMap[inputName] = propertyName;
  }
}


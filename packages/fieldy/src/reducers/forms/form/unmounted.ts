import { IAction } from "../../../interfaces";

export function unmountedReduer(state: boolean|undefined, action:IAction<any>){
  return state
}
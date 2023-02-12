import { IAction } from "core/interfaces/action";

export function unmountedReduer(state: boolean|undefined, action:IAction<any>){
  return state
}
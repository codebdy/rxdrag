import { IActivityMaterial } from "@rxdrag/schema"
import {Controllers} from "@rxdrag/minions"
import { IForm } from "@rxdrag/fieldy"

export type Navigate = (url: string) => void

export interface IActivityFactoryOptions {
  controllers?: Controllers,
  materials?: IActivityMaterial[],
  form?: IForm,
  fieldPath?: string,
  //路由跳转
  navigate?: Navigate
}



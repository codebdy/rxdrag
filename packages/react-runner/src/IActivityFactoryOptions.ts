import { IForm } from "@rxdrag/fieldy"
import { Controllers } from "@rxdrag/minions-react"

export type Navigate = (url: string) => void

export interface IActivityFactoryOptions {
  controllers?: Controllers,
  materials?: IActivityMaterial[],
  form?: IForm,
  fieldPath?: string,
  //路由跳转
  navigate?: Navigate
}



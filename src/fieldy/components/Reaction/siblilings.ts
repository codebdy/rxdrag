import { IFieldParams } from "fieldy/contexts";
import { IFieldyEngine } from "fieldy/interfaces";

export const PREFIX_SIBLINGS = "$siblings";

export class Siblings {
  [key: string]: any
  constructor(private fieldParams: IFieldParams, private fieldy: IFieldyEngine, private formName: string) {
    const { basePath, path } = fieldParams
    const form = fieldy.getForm(formName)
    if (!path) {
      return
    }
    for (const key of Object.keys(form?.fields || {})) {
      //同在根节点
      if (!basePath) {
        if (key.indexOf(".") === -1) {
          this[key] = fieldy.getField(formName, key)
        }
      } else if(key.startsWith(basePath)){
        const siblingKey = key.substring(basePath.length)
        if (siblingKey && siblingKey.indexOf(".") === -1) {
          this[siblingKey] = fieldy.getField(formName, key)
        }
      }
    }
  }
}
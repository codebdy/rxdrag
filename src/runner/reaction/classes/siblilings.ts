import { IField, IFieldyEngine } from "runner/fieldy";

export const PREFIX_SIBLINGS = "$siblings";

export class Siblings {
  [key: string]: any
  constructor(field: IField, fieldy: IFieldyEngine, formName: string) {
    //const { basePath, path } = fieldParams
    const form = fieldy.getForm(formName)
    if (!field.path) {
      return
    }
    for (const key of Object.keys(form?.fields || {})) {
      //同在根节点
      if (!field.basePath) {
        if (key.indexOf(".") === -1) {
          this[key] = fieldy.getField(formName, key)?.value
        }
      } else if (key.startsWith(field.basePath)) {
        const siblingKey = key.substring(field.basePath.length + 1)
        if (siblingKey && siblingKey.indexOf(".") === -1) {
          this[siblingKey] = form.getField(key)?.value
        }
      }
    }
  }
}
import { isArr, isObj, isStr } from "@rxdrag/shared";
import _ from "lodash"
import { INodeSchema } from "@rxdrag/schema";
import { ILocales } from "../interfaces";
import { LocalesManager } from "./LocalesManager";

export class RxDragLocalesManager extends LocalesManager {

  constructor(lang: string = "zh-CN", locales?: ILocales) {
    super(lang, locales)
  }

  getResourceMessage(key: string): string | null {
    const currentLocales = this.locales[this.lang]?.resources
    return this.getValueByKey(currentLocales || {}, key)
  }

  getComponentMessage(componentName: string, key: string): string | null {
    const currentLocales = this.locales?.[this.lang]?.components
    return this.getValueByKey(currentLocales?.[componentName] || {}, key)
  }

  getComponentSettingsMessage(componentName: string, key: string): string | null {
    return this.getComponentMessage(componentName, "settings." + key)
  }

  getSettersMessage(key: string): string | null {
    const currentLocales = this.locales?.[this.lang]?.setters
    return this.getValueByKey(currentLocales || {}, key)
  }

  registerResourceLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("resources", ...locales)
  }

  registerComponentsLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("components", ...locales)
  }

  registerComponentLocales(componentName: string, locales: ILocales): void {
    let newLocales = { ...this.locales }
    for (const lang of Object.keys(locales)) {
      if (!newLocales[lang]) {
        newLocales[lang] = {}
      }
      const currentlangLocales = { ...newLocales[lang] }
      if (!currentlangLocales?.components) {
        currentlangLocales.components = {}
      }
      currentlangLocales.components = { ...currentlangLocales.components, [componentName]: locales[lang] }
      newLocales = { ...newLocales, [lang]: currentlangLocales }
    }
    this.resources.setValue({ ...this.resources.getValue(), locales: newLocales })
  }

  registerSetterLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("setters", ...locales)
  }

  translateDesignerSchema(componentName: string, schema: INodeSchema): INodeSchema {
    return this.translateObject(componentName, schema)
  }

  private translateObject(componentName: string, obj: any) {
    for (const key of Object.keys(obj)) {
      if (isStr(obj[key])) {
        obj[key] = this.translateString(componentName, obj[key])
      } else if (isObj(obj[key])) {
        obj[key] = this.translateObject(componentName, obj[key])
      } else if (isArr(obj[key])) {
        obj[key] = this.translateArray(componentName, obj[key])
      }
    }

    return obj
  }

  private translateArray(componentName: string, arr: any[]) {
    arr.forEach((item, index) => {
      if (isStr(item)) {
        arr[index] = this.translateString(componentName, item)
      } else if (isObj(item)) {
        arr[index] = this.translateObject(componentName, item)
      } else if (isArr(item)) {
        arr[index] = this.translateArray(componentName, item)
      }
    })

    return arr
  }

  private translateString(componentName: string, str: string) {
    if (str.startsWith('$')) {
      const token = str.substring(1)

      return this.getMessage(token) || this.getSettersMessage(token) || this.getComponentMessage(componentName, "settings." + token) || str
    }

    return str
  }

  private registerLocalesOnItem(item: "components" | "resources" | "setters", ...locales: ILocales[]): void {
    let newLocales = { ...this.locales }
    for (const locale of locales) {
      for (const lang of Object.keys(locale)) {
        if (!newLocales[lang]) {
          newLocales[lang] = {}
        }
        newLocales[lang] = {
          ...newLocales[lang], [item]: { ...newLocales[lang]?.[item], ...locale[lang] }
        }
      }
    }
    this.resources.setValue({ ...this.resources.getValue(), locales: newLocales })
  }
}
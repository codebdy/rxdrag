import { INodeSchema } from "core/interfaces";
import { ILocales, ILocalesManager } from "core/interfaces/loacales";
import { isArr, isObj, isStr } from "core/utils/types";
import _ from "lodash"

export class LocalesManager implements ILocalesManager {
  locales: ILocales = {
  }
  constructor(private lang: string) { }

  setLanguage(lang: string): void {
    this.lang = lang
  }

  getMessage(key: string): string | null {
    return this.getValueByKey(this.locales[this.lang], key)
  }

  getResouceMessage(key: string): string | null {
    const currenLocales = this.locales[this.lang]?.resources
    return this.getValueByKey(currenLocales || {}, key)
  }

  getComponentMessage(componentName: string, key: string): string | null {
    const currenLocales = this.locales[this.lang]?.components
    return this.getValueByKey(currenLocales?.[componentName] || {},key)
  }

  getToolsMessage(key: string): string | null {
    const currenLocales = this.locales[this.lang]?.tools
    return this.getValueByKey(currenLocales || {}, key)
  }

  registerLocales(...locales: ILocales[]): void {
    this.locales = _.merge(this.locales, ...locales)
  }
  registerResourceLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("resources", ...locales)
  }

  registerComponentsLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("components", ...locales)
  }

  registerComponentLocales(componentName: string, locales: ILocales): void {
    for (const lang of Object.keys(locales)) {
      if (!this.locales[lang]) {
        this.locales[lang] = {}
      }
      const currentlangLocales = this.locales[lang]
      if (!currentlangLocales.components) {
        currentlangLocales.components = {}
      }
      currentlangLocales.components[componentName] = locales[lang]
    }
  }

  registerToolsLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("tools", ...locales)
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

      return this.getMessage(token) || this.getToolsMessage(token) || this.getComponentMessage(componentName, "settings." + token) || str
    }

    return str
  }

  private registerLocalesOnItem(item: "components" | "resources" | "tools", ...locales: ILocales[]): void {
    for (const locale of locales) {
      for (const lang of Object.keys(locale)) {
        if (!this.locales[lang]) {
          this.locales[lang] = {}
        }
        this.locales[lang][item] = _.merge(this.locales[lang]?.[item] || {}, locale[lang])
      }
    }
  }

  private getValueByKey(locales: any, key: string): string | null {
    const [subKey, ...others] = key.split(".")

    if (!others?.length) {
      return locales[subKey]
    } else {
      const valueByMergedKey = locales[key]
      //处理这种情况：Layout.Header
      if(valueByMergedKey){
        return valueByMergedKey
      }
      return this.getValueByKey(locales[subKey] || {}, others.join("."))
    }
  }
}
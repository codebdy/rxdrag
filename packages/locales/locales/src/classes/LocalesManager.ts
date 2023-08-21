import { SubscribableRecord, isArr, isObj, isStr } from "@rxdrag/shared";
import _ from "lodash"
import { INodeSchema } from "@rxdrag/schema";
import { ILangLocales, ILocales, ILocalesManager } from "../interfaces";

export class LocalesManager extends SubscribableRecord<ILangLocales> implements ILocalesManager {

  constructor(public lang: string = "zh-CN", locales?: ILocales) {
    super()
    locales && this.registerLocales(locales)
  }

  getMessage(key: string): string | null {
    return this.getValueByKey(this.record?.[this.lang], key)
  }

  getResourceMessage(key: string): string | null {
    const currentLocales = this.record[this.lang]?.resources
    return this.getValueByKey(currentLocales || {}, key)
  }

  getComponentMessage(componentName: string, key: string): string | null {
    const currentLocales = this.record?.[this.lang]?.components
    return this.getValueByKey(currentLocales?.[componentName] || {}, key)
  }

  getToolsMessage(key: string): string | null {
    const currentLocales = this.record?.[this.lang]?.setters
    return this.getValueByKey(currentLocales || {}, key)
  }

  registerLocales(...locales: ILocales[]): void {
    this.record = _.merge(this.record, ...locales)
    this.emitChange()
  }
  registerResourceLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("resources", ...locales)
    this.emitChange()
  }

  registerComponentsLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("components", ...locales)
    this.emitChange()
  }

  registerComponentLocales(componentName: string, locales: ILocales): void {
    for (const lang of Object.keys(locales)) {
      if (!this.record[lang]) {
        this.record[lang] = {}
      }
      const currentlangLocales = this.record[lang] || {}
      if (!currentlangLocales?.components) {
        currentlangLocales.components = {}
      }
      currentlangLocales.components[componentName] = locales[lang]
    }
    this.emitChange()
  }

  registerSetterLocales(...locales: ILocales[]): void {
    this.registerLocalesOnItem("setters", ...locales)
    this.emitChange()
  }

  translateDesignerSchema(componentName: string, schema: INodeSchema): INodeSchema {
    return this.translateObject(componentName, schema)
    this.emitChange()
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

  private registerLocalesOnItem(item: "components" | "resources" | "setters", ...locales: ILocales[]): void {
    for (const locale of locales) {
      for (const lang of Object.keys(locale)) {
        if (!this.record[lang]) {
          this.record[lang] = {}
        }
        this.record[lang]![item] = _.merge(this.record[lang]?.[item] || {}, locale[lang])
      }
    }
  }

  private getValueByKey(locales: any, key: string): string | null {
    const [subKey, ...others] = key.split(".")

    if (!others?.length) {
      return locales[subKey]
    } else {
      const valueByMergedKey = locales?.[key]
      //处理这种情况：Layout.Header
      if (valueByMergedKey) {
        return valueByMergedKey
      }
      return this.getValueByKey(locales?.[subKey] || {}, others.join("."))
    }
  }
}
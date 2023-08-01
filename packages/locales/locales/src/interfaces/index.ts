import { INodeSchema } from "@rxdrag/schema"

export interface ILangLocales {
  resources?: {
    [key: string]: any
  },
  components?: {
    [componentName: string]: {
      title?: string,
      description?: string,
      [key: string]: any
    }
  },
  setters?: {
    [key: string]: any
  },
  [key: string]: any
}

export interface ILocales {
  [ISOCode: string]: ILangLocales
}

export interface ILocalesManager {
  lang: string
  //setLanguage(lang: string): void
  getMessage(key: string): string | null
  getResourceMessage(key: string): string | null
  getComponentMessage(componentName: string, key: string): string | null
  getToolsMessage(key: string): string | null
  registerLocales(...locales: ILocales[]): void
  registerResourceLocales(...locales: ILocales[]): void
  registerComponentLocales(componentName: string, locales: ILocales): void
  registerComponentsLocales(...locales: ILocales[]): void
  registerSetterLocales(...locales: ILocales[]): void

  translateDesignerSchema(componentName: string, schema: INodeSchema): INodeSchema
}
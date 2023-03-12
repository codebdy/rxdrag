import { INodeSchema } from "./document"

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
  tools?: {
    [key: string]: any
  },
  [key: string]: any
}

export interface ILocales {
  [ISOCode: string]: ILangLocales
}

export interface ILocalesManager {
  setLanguage(lang: string): void
  getMessage(key: string): string | null
  getResouceMessage(key: string): string | null
  getComponentMessage(componentName: string, key: string): string | null
  //getComponentSettingsMessage(componentName: string, key: string): string | null
  getToolsMessage(key: string): string | null
  registerLocales(...locales: ILocales[]): void
  registerResourceLocales(...locales: ILocales[]): void
  registerComponentLocales(componentName: string, locales: ILocales): void
  registerComponentsLocales(...locales: ILocales[]): void
  registerToolsLocales(...locales: ILocales[]): void

  translateDesignerSchema(compoentName: string, schema: INodeSchema): INodeSchema
}
import { INodeSchema } from "@rxdrag/schema"
import { ISubscribable } from "@rxdrag/shared"

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

export type LocalesResources = {
  lang: string,
  locales: Record<string, ILangLocales>
}

export interface ILocalesManager extends ISubscribable<LocalesResources> {
  getLang: () => string
  setLang(lang: string): void
  getMessage(key: string): string | null
  registerLocales(...locales: ILocales[]): void
}

export interface IRxDragLocalesManager extends ILocalesManager {
  setLang(lang: string): void
  getResourceMessage(key: string): string | null
  getComponentMessage(componentName: string, key: string): string | null
  getComponentSettingsMessage(componentName: string, key: string): string | null
  getSettersMessage(key: string): string | null

  registerResourceLocales(...locales: ILocales[]): void
  registerComponentLocales(componentName: string, locales: ILocales): void
  registerComponentsLocales(...locales: ILocales[]): void
  registerSetterLocales(...locales: ILocales[]): void
  translateDesignerSchema(componentName: string, schema: INodeSchema): INodeSchema
}

import { Listener, Subscriber } from "@rxdrag/shared";
import _ from "lodash"
import { ILocales, ILocalesManager, LocalesResources } from "../interfaces";

export class LocalesManager implements ILocalesManager {
  protected resources: Subscriber<LocalesResources>

  constructor(lang: string = "zh-CN", locales?: ILocales) {
    this.resources = new Subscriber<LocalesResources>({
      lang,
      locales: locales || {}
    })
  }

  subscribeChange = (listener: Listener<LocalesResources>) => {
    return this.resources.subscribeChange(listener)
  };

  get lang() {
    return this.getLang()
  }

  get locales() {
    return this.resources.getValue().locales
  }

  getLang = () => {
    return this.resources.getValue().lang
  }

  setLang(lang: string): void {
    this.resources.setValue({ ...this.resources.getValue(), lang })
  }

  getMessage(key: string): string | null {
    return this.getValueByKey(this.locales?.[this.lang], key)
  }

  registerLocales(...locales: ILocales[]): void {
    let newLocales = { ...this.locales }
    newLocales = _.merge(newLocales, ...locales)
    this.resources.setValue({ ...this.resources.getValue(), locales: newLocales })
  }

  protected getValueByKey(locales: any, key: string): string | null {
    const [subKey, ...others] = key.split(".")

    if (!others?.length) {
      return locales?.[subKey]
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
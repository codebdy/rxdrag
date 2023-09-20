import { memo, useEffect, useState } from "react"
import { HistoryContext, HistoryRedords, MenuSchemaContext, defautHistory, ResourcesContext } from "./contexts";
import { defaultMenuResources } from "./resources";
import { IMenuSchema } from "./interfaces/schema";
import { ILocales, LocalesManager } from "@rxdrag/locales";
import { defalutLocales } from "./locales";
import { LocalesContext } from "../../locales/locales-react";
import { IMenuItemResource } from "./interfaces";

export const DesignerRoot = memo((props: {
  //当前语言
  lang?: string,
  //多语言资源
  locales?: ILocales,
  resources?: IMenuItemResource[],
  children?: React.ReactNode,
}) => {
  const { lang, locales, resources, children } = props;
  const menuSchemaState = useState<IMenuSchema>({ rootIds: [], items: [] })
  const historyState = useState<HistoryRedords>(defautHistory)
  const [localesManager] = useState(new LocalesManager(lang, defalutLocales))
  useEffect(() => {

    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  useEffect(() => {
    if (lang) {
      localesManager.setLang(lang)
    }
  }, [lang, localesManager])

  return (
    <LocalesContext.Provider value={localesManager}>
      <ResourcesContext.Provider value={resources || []}>
        <MenuSchemaContext.Provider value={menuSchemaState}>
          <HistoryContext.Provider value={historyState}>
            {children}
          </HistoryContext.Provider>
        </MenuSchemaContext.Provider>
      </ResourcesContext.Provider>
    </LocalesContext.Provider>
  )
})
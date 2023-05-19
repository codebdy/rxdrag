import { memo, useEffect, useState } from "react"
import { minionsEditorLocales } from "../locales";
import { ILocales, LocalesManager } from "@rxdrag/locales";
import { LocalesContext } from "@rxdrag/react-locales";
import { ControllerMetaEditorAntd5Inner, ControllerMetaEditorAntd5InnerProps } from "./ControllerMetaEditorAntd5Inner";

export const ControllerMetaEditorAntd5 = memo((
  props: {
    lang?: string,
    locales?: ILocales,
  } & ControllerMetaEditorAntd5InnerProps
) => {
  const { lang, locales, ...other } = props
  const [localesManager] = useState(new LocalesManager(lang, minionsEditorLocales))
  useEffect(() => {
    locales && localesManager.registerLocales(locales)
  }, [localesManager, locales])

  return (
    <LocalesContext.Provider value={localesManager}>
      <ControllerMetaEditorAntd5Inner {...other} />
    </LocalesContext.Provider>
  )
})
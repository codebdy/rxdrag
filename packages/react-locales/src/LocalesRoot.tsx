import { ILocalesManager, LocalesManager } from "@rxdrag/locales"
import React, { memo, useEffect, useState } from "react"
import { LocalesContext } from "./contexts"

export const LocalesRoot = memo((
  props: {
    children?: React.ReactNode
    localesManager?: ILocalesManager,
    lang: string,
  }
) => {
  const { children, localesManager: originalLocales, lang } = props
  const [localesManager, setLocalesManager] = useState<ILocalesManager>()

  useEffect(() => {
    if (!originalLocales) {
      setLocalesManager(new LocalesManager(lang))
    } else {
      setLocalesManager(originalLocales)
    }
  }, [localesManager, lang])

  return (
    <LocalesContext.Provider value={localesManager}>
      {children}
    </LocalesContext.Provider>
  )
})
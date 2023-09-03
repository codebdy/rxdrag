import { useSettersTranslate } from "@rxdrag/react-core"
import { memo } from "react"

export const ThemeTokenSetter = memo(() => {
  const t = useSettersTranslate()
  return (
    <>
      {t("primaryColor")}
    </>
  )
})
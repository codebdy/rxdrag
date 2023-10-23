import { useTranslate } from "@rxdrag/react-locales"
import { Button } from "antd"
import { memo } from "react"

export const QueryParamsInput = memo(() => {
  const t = useTranslate()

  return (
    <>
      <Button>
        {t("config")}
      </Button>
    </>
  )
})
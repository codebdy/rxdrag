import { useTranslate } from "@rxdrag/react-locales"
import { orderIcon } from "@rxdrag/react-shared"
import { Popover, Button } from "antd"
import { memo } from "react"

export const SortPopover = memo(() => {
  const t = useTranslate()
  return (
    <Popover
      arrow
      placement="bottom"
      content={"content"}
      title={t("order")}
      trigger="click"
    >
      <Button
        type="text"
        size="small"
        icon={orderIcon}
      ></Button>
    </Popover>
  )
})
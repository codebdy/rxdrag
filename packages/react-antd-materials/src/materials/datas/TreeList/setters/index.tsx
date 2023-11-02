import { useCurrentNode, useTreeNode, useRemoveSlot, useAddSlot, useSettersTranslate } from "@rxdrag/react-core"
import { useTranslate } from "@rxdrag/react-locales"
import { Select } from "antd"
import { memo, useCallback, useMemo } from "react"

export const TreeListPopupSelect = memo((props: {
  name?: string
}) => {
  const { name } = props
  const currentNode = useCurrentNode()
  const node = useTreeNode(currentNode?.id || "")
  const removeSlot = useRemoveSlot(node?.id);
  const addSlot = useAddSlot(node?.id)
  const t = useTranslate("components.TreeList.settings")

  const checked = useMemo(() => {
    return name ? !!node?.slots?.[name] : false
  }, [name, node?.slots])

  const handleChange = useCallback((checked: boolean) => {
    if (checked) {
      name && node && addSlot(name)
    } else {
      name && node && removeSlot(name)
    }
  }, [addSlot, name, node, removeSlot])

  return (
    <Select
      options={[
        {
          value: "popover",
          label: t("popover"),
        },
        {
          value: "model",
          label: t("model"),
        },
        {
          value: "drawer",
          label: t("drawer"),
        },
      ]}
    />
  )
})
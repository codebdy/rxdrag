import { useToolsTranslate } from "@rxdrag/react-core"
import { Form, Input, Select } from "antd"
import { ActionType, IShortcutControllerMeta } from "controller/shortcuts/IShortcutControllerMeta"
import { memo, useCallback } from "react"

export const ShortcutControllerSetter = memo((props: {
  value?: IShortcutControllerMeta,
  onChange?: (value?: IShortcutControllerMeta) => void,
}) => {
  const { value, onChange } = props;
  const t = useToolsTranslate()

  const handleActionTypeChange = useCallback((actionType?: ActionType) => {
    value && onChange?.({ ...value, actionType, global: true })
  }, [onChange, value])

  const handleUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    value && onChange?.({ ...value, url: event.target.value?.trim() })
  }, [onChange, value])

  return (<>
    <Form.Item
      label={t("actionType")}
    >
      <Select
        defaultValue={value?.actionType}
        allowClear
        onChange={handleActionTypeChange}
        options={[
          { value: ActionType.list, label: t("list") },
          { value: ActionType.submit, label: t("submit") },
          { value: ActionType.search, label: t("search") },
          { value: ActionType.removeRecord, label: t("removeRecord") },
        ]}
      />
    </Form.Item>
    {
      value?.actionType && value.actionType !== ActionType.search &&
      <Form.Item
        label={"Url"}
      >
        <Input value={value?.url} onChange={handleUrlChange} />
      </Form.Item>
    }
  </>)
})
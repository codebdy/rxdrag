import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useSettersTranslate } from "@rxdrag/react-core"
import { createId } from "@rxdrag/shared"
import { Form, Input, Switch } from "antd"
import { memo, useCallback } from "react"

export const ControllerSetter = memo((
  props: {
    value?: IControllerMeta | null,
    onChange?: (value?: IControllerMeta | null) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()

  const handleSwitch = useCallback((checked: boolean) => {
    if (checked) {
      onChange?.({ ...value, id: createId() })
    } else {
      onChange?.(null)
    }
  }, [onChange, value])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      onChange?.({ ...value, name: e.target.value })
    }
  }, [onChange, value])

  return (
    <>
      <Form.Item
        label={t("joinFlow")}
      >
        <Switch
          checked={!!value?.id}
          onChange={handleSwitch}
        />
      </Form.Item>
      {
        value?.id &&
        <Form.Item
          label={t("name")}
        >
          <Input
            value={value.name || ""}
            onChange={handleNameChange}
          />
        </Form.Item>
      }
    </>
  )
})
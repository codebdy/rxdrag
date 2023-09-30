import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { useSettersTranslate } from "@rxdrag/react-core"
import { createId } from "@rxdrag/shared"
import { Form, Input, Switch } from "antd"
import { memo, useCallback } from "react"

export const ControllerSetter = memo((
  props: {
    value?: IControllerMeta | null,
    onChange?: (value?: IControllerMeta | null) => void,
    isArray?: boolean
  }
) => {
  const { value, onChange, isArray } = props;
  const t = useSettersTranslate()

  const handleSwitch = useCallback((checked: boolean) => {
    if (checked) {
      onChange?.({ ...value, id: value?.id ? value.id : createId(), isArray })
    } else {
      if (value) {
        onChange?.({ ...value, enable: false })
      }
    }
  }, [isArray, onChange, value])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (value) {
      onChange?.({ ...value, name: e.target.value, isArray })
    }
  }, [isArray, onChange, value])

  return (
    <>
      <Form.Item
        label={t("joinFlow")}
      >
        <Switch
          checked={value?.enable}
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
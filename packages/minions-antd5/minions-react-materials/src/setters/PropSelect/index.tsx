import { useAllControllerMetas } from "@rxdrag/minions-controller-editor";
import { IPropParam } from "@rxdrag/minions-runtime-react";
import { useTranslate } from "@rxdrag/react-locales"
import { AutoComplete, Form, Select } from "antd"
import { memo, useCallback } from "react"

//本控件强依赖rxdrag editor
export const PropSelect = memo((
  props: {
    value?: IPropParam,
    onChange?: (value?: IPropParam) => void,
  }
) => {
  const { value, onChange } = props;
  const controllers = useAllControllerMetas();
  const t = useTranslate()

  const hanldeControllerChange = useCallback((value: string) => {
    onChange?.({ controllerId: value, prop: undefined })
  }, [onChange])

  return (<>
    <Form.Item
      label={t("component")}
    >
      <Select
        value={value?.controllerId}
        options={controllers?.map((controllerMeta) => ({ value: controllerMeta.id, label: controllerMeta.name }))}
        onChange={hanldeControllerChange}
      />
    </Form.Item>
    {
      value?.controllerId &&
      <Form.Item
        label={t("prop")}
      >
        <AutoComplete
          options={[
            { value: 'Burns Bay Road' },
            { value: 'Downing Street' },
            { value: 'Wall Street' },
          ]}
        />
      </Form.Item>
    }

  </>)
})
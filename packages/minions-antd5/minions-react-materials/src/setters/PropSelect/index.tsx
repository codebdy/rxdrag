import { useAllControllerMetas } from "@rxdrag/minions-controller-editor";
import { IPropParam } from "@rxdrag/minions-runtime-react";
import { useTranslate } from "@rxdrag/react-locales"
import { AutoComplete, Form, Select } from "antd"
import { memo, useCallback, useMemo } from "react"

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
  const controller = useMemo(() => {
    return controllers?.find(meta => meta.id === value?.controllerId)
  }, [controllers, value?.controllerId])

  const handleControllerChange = useCallback((controllerId: string) => {
    onChange?.({ controllerId: controllerId, prop: undefined })
  }, [onChange])

  const handlePropChange =  useCallback((prop: string) => {
    onChange?.({ ...value, prop })
  }, [onChange, value])

  return (<>
    <Form.Item
      label={t("component")}
    >
      <Select
        value={value?.controllerId}
        options={controllers?.map((controllerMeta) => ({ value: controllerMeta.id, label: controllerMeta.name }))}
        onChange={handleControllerChange}
      />
    </Form.Item>
    {
      value?.controllerId &&
      <Form.Item
        label={t("prop")}
      >
        <AutoComplete
          allowClear
          value={value?.prop}
          options={controller?.props?.map(prop => ({ value: prop }))}
          onChange={handlePropChange}
        />
      </Form.Item>
    }

  </>)
})
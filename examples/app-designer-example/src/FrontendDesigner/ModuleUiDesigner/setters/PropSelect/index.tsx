import { getControllerComponentInfo } from "@rxdrag/minions-react-materials";
import { IPropConfig } from "@rxdrag/minions-runtime-react";
import { useDesignerEngine } from "@rxdrag/react-core";
import { useTranslate } from "@rxdrag/react-locales"
import { AutoComplete, Form } from "antd"
import { memo, useCallback, useMemo } from "react"

//本控件强依赖rxdrag editor
export const PropSelect = memo((
  props: {
    value?: IPropConfig,
    onChange?: (value?: IPropConfig) => void,
  }
) => {
  const { value, onChange } = props;
  const t = useTranslate()
  const engine = useDesignerEngine()
  const { material } = useMemo(() => getControllerComponentInfo(value, engine), [engine, value])

  const handlePropChange = useCallback((prop: string) => {
    onChange?.({ ...value, prop })
  }, [onChange, value])

  return (<>
    {
      value?.controllerId &&
      <Form.Item
        label={t("prop")}
      >
        <AutoComplete
          allowClear
          value={value?.prop}
          options={material?.controller?.props?.map(prop => ({
            value: prop.name,
            label: prop.label?.startsWith("$")
              ? engine?.getLocalesManager().getComponentSettingsMessage(material.componentName, prop.label.substring(1))
              : prop.label
          }))}
          onChange={handlePropChange}
        />
      </Form.Item>
    }
  </>)
})
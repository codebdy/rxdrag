import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { IMaterial, useCurrentNode, useDesignerEngine, useSettersTranslate } from "@rxdrag/react-core"
import { createId } from "@rxdrag/shared"
import { Form, Input, Switch } from "antd"
import { memo, useCallback, useMemo } from "react"

export const ControllerSetter = memo((
  props: {
    value?: IControllerMeta | null,
    onChange?: (value?: IControllerMeta | null) => void,
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()
  const engine = useDesignerEngine()
  const node = useCurrentNode()

  const material = useMemo(() => {
    return engine?.getComponentManager().getComponentConfig(node?.meta.componentName || "") as IMaterial | undefined
  }, [engine, node?.meta.componentName])

  const handleSwitch = useCallback((checked: boolean) => {
    if (checked) {
      onChange?.({
        ...value,
        id: value?.id ? value.id : createId(),
        controllerClass: material?.controller?.controllerClass,
        enable: true,
      })
    } else {
      if (value) {
        onChange?.({ ...value, enable: false })
      }
    }
  }, [material?.controller?.controllerClass, onChange, value])

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
import { useAllControllerMetas } from "@rxdrag/minions-controller-editor";
import { IEventParam } from "@rxdrag/minions-runtime-react";
import { useTranslate } from "@rxdrag/react-locales"
import { Form, Select } from "antd"
import { memo, useCallback, useMemo } from "react"

//本控件强依赖rxdrag editor
export const ReactionSelect = memo((
  props: {
    value?: IEventParam,
    onChange?: (value?: IEventParam) => void,
  }
) => {
  const { value, onChange } = props;
  const controllers = useAllControllerMetas();
  const t = useTranslate()
  const controller = useMemo(() => {
    return controllers?.find(meta => meta.id === value?.controllerId)
  }, [controllers, value?.controllerId])

  const handleControllerChange = useCallback((controllerId: string) => {
    onChange?.({ controllerId: controllerId, logicFlowId: undefined })
  }, [onChange])

  const handlePropChange = useCallback((logicFlowId: string) => {
    onChange?.({ ...value, logicFlowId })
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
        label={t("reaction")}
      >
        <Select
          allowClear
          value={value?.logicFlowId}
          options={controller?.reactions?.map(reaction => ({ value: reaction.id, label: reaction.label || reaction.name }))}
          onChange={handlePropChange}
        />
      </Form.Item>
    }

  </>)
})
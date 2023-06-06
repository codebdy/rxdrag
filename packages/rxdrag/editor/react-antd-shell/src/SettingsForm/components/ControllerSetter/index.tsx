import { useMemo } from "react"
import { Form, Radio } from "antd"
import { memo, useCallback, useEffect } from "react"
import { useDesignerEngine, useToolsTranslate } from "@rxdrag/react-core"
import { createUuid } from "@rxdrag/shared"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { IEventMeta } from "@rxdrag/minions-controller-editor"
import { useMinionOptions } from "../../../hooks/useMinionOptions"

export const ControllerSetter = memo((props: {
  events?: IEventMeta[]
  title: string,
  value: ILogicFlowControllerMeta,
  onChange?: (value?: ILogicFlowControllerMeta) => void,
}) => {
  const { title, value, onChange, ...other } = props;
  const t = useToolsTranslate()

  const minionOptions = useMinionOptions();
  const eng = useDesignerEngine();
  useEffect(() => {
    const langMgr = eng?.getLoacalesManager()
    for (const ctrlDef of minionOptions?.controllers || []) {
      ctrlDef.locales && langMgr?.registerToolsLocales(ctrlDef.locales)
    }
  }, [eng, minionOptions?.controllers])

  const trimLabel = useCallback((label?: string) => {
    if (label?.startsWith("$")) {
      return label.substring(1)
    }
    return label;
  }, [])

  const handleControllerTypeChange = useCallback((type: string) => {
    if (value?.controllerType === type) {
      onChange?.({ ...value, id: value?.id, enable: false, })
    } else {
      onChange?.({ ...value, id: value?.id || createUuid(), enable: true, controllerType: type })
    }
  }, [onChange, value])

  const selectedController = useMemo(() => {
    return minionOptions?.controllers?.find(ctrl => ctrl.name === value?.controllerType)
  }, [minionOptions?.controllers, value?.controllerType])

  return (
    <div>
      <Form.Item
        label={title}
      >
        <Radio.Group
          value={value?.controllerType}
        >
          {
            minionOptions?.controllers?.map(ctrlDef => {
              return (
                <Radio.Button
                  key={ctrlDef.name}
                  value={ctrlDef.name}
                  onClick={() => handleControllerTypeChange(ctrlDef.name)}
                >
                  {t(trimLabel(ctrlDef.label) || "") || ctrlDef.name}
                </Radio.Button>
              )
            })
          }
        </Radio.Group>
      </Form.Item>
      {
        selectedController &&
        <selectedController.setter {...other} value={value} onChange={onChange} />
      }

    </div>

  )
})
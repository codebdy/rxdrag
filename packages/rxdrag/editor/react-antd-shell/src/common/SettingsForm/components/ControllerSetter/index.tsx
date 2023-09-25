import { useMemo, useState } from "react"
import { Form, Radio } from "antd"
import { memo, useCallback, useEffect } from "react"
import { useDesignerEngine, useMinionOptions, useSettersTranslate } from "@rxdrag/react-core"
import { createId } from "@rxdrag/shared"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { IEventMeta } from "@rxdrag/minions-controller-editor"

export const ControllerSetter = memo((props: {
  events?: IEventMeta[]
  title: string,
  value: ILogicFlowControllerMeta,
  onChange?: (value?: ILogicFlowControllerMeta) => void,
}) => {
  const { title, value, onChange, ...other } = props;
  const t = useSettersTranslate()
  const [localesInited, setLocalesInited] = useState(false);

  const minionOptions = useMinionOptions();
  const eng = useDesignerEngine();
  useEffect(() => {
    const langMgr = eng?.getLocalesManager()
    for (const ctrlDef of minionOptions?.controllers || []) {
      ctrlDef.locales && langMgr?.registerSetterLocales(ctrlDef.locales)
    }
    setLocalesInited(true)
  }, [eng, minionOptions?.controllers])

  const trimLabel = useCallback((label?: string) => {
    if (label?.startsWith("$")) {
      return label.substring(1)
    }
    return label;
  }, [])

  const handleControllerTypeChange = useCallback((type: string) => {
    if (value?.controllerType === type) {
      onChange?.({ ...value, id: value?.id, controllerType: undefined })
    } else {
      onChange?.({ ...value, id: value?.id || createId(), controllerType: type })
    }
  }, [onChange, value])

  const selectedController = useMemo(() => {
    return minionOptions?.controllers?.find(ctrl => ctrl.name === value?.controllerType)
  }, [minionOptions?.controllers, value?.controllerType])

  return (
    <>
      <Form.Item
        label={title}
      >
        <Radio.Group
          value={value?.controllerType}
        >
          {
            localesInited && minionOptions?.controllers?.map(ctrlDef => {
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

    </>
  )
})
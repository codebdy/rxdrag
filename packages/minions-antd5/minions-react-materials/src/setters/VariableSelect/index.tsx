/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAllControllerMetas } from "@rxdrag/minions-controller-editor"
import { IVirableParam } from "@rxdrag/minions-runtime-react"
import { useTranslate } from "@rxdrag/react-locales"
import { Form, Select } from "antd"
import { memo, useCallback, useMemo } from "react"

export const VariableSelect = memo((
  props: {
    value?: IVirableParam,
    onChange?: (value?: IVirableParam,) => void
  }
) => {
  const { value, onChange } = props
  const controllers = useAllControllerMetas()
  const t = useTranslate()
  const controller = useMemo(() => {
    return controllers?.find(meta => meta.id === value?.controllerId)
  }, [controllers, value?.controllerId])

  const hanldeControllerChange = useCallback((controllerId: string) => {
    onChange?.({ controllerId: controllerId, variable: undefined })
  }, [onChange])

  const handleVariableChange =  useCallback((variable: string) => {
    onChange?.({ ...value, variable })
  }, [onChange, value])

  return (
    <>
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
          label={t("variable")}
        >
          <Select
            value={value?.variable}
            options={
              controller?.variables?.map((variable: { name: any }) => {
                return {
                  value: variable.name,
                  label: variable.name
                }
              })
            }
            onChange={handleVariableChange}
          />
        </Form.Item>
      }

    </>

  )
})
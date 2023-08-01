import { IYupConfig, YupDate } from "@rxdrag/fieldy-yup-validation";
import { useSettersTranslate } from "@rxdrag/react-core";
import { DatePicker } from "antd";
import { memo, useCallback } from "react"
import { PropLayout } from "../PropLayout";
import { MessageInput } from "./MessageInput";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

export const DateRuleInput = memo((
  props: {
    value?: YupDate,
    onChange?: (value?: YupDate) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()

  const handleMaxChange = useCallback((max: DatePickerProps['value'] | RangePickerProps['value']) => {
    onChange?.({ ...value, max: { ...value?.max, value: max?.toString() || undefined } })
  }, [onChange, value])

  const handleMinChange = useCallback((min: DatePickerProps['value'] | RangePickerProps['value']) => {
    onChange?.({ ...value, min: { ...value?.min, value: min?.toString() || undefined } })
  }, [onChange, value])

  const handleConfigChange = useCallback((name: string, config?: IYupConfig<unknown>) => {
    onChange?.({ ...value, [name]: config })
  }, [onChange, value])

  return (
    <>
      <PropLayout
        label={t('max')}
        expressionSetter={
          <MessageInput
            value={value?.max}
            onChange={(config) => handleConfigChange("max", config)}
          />
        }
      >
        <DatePicker
          style={{ width: "100%" }}
          onOk={handleMaxChange}
        />
      </PropLayout>
      <PropLayout
        label={t('min')}
        expressionSetter={
          <MessageInput
            value={value?.min}
            onChange={(config) => handleConfigChange("min", config)}
          />
        }
      >
        <DatePicker
          style={{ width: "100%" }}
          onOk={handleMinChange}
        />
      </PropLayout>
    </>
  )
})
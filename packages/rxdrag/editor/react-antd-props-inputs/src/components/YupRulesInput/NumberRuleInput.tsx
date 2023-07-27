import { IYupConfig, YupNumber } from "@rxdrag/fieldy-yup-validation";
import { useSettersTranslate } from "@rxdrag/react-core";
import { InputNumber, Switch } from "antd";
import { memo, useCallback } from "react"
import { PropLayout } from "../PropLayout";
import { MessageInput } from "./MessageInput";

export const NumberRuleInput = memo((
  props: {
    value?: YupNumber,
    onChange?: (value?: YupNumber) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()

  const handleMaxChange = useCallback((max: number | null) => {
    onChange?.({ ...value, max: { ...value?.max, value: max || undefined } })
  }, [onChange, value])

  const handleMinChange = useCallback((min: number | null) => {
    onChange?.({ ...value, min: { ...value?.min, value: min || undefined } })
  }, [onChange, value])

  const handleMoreThanChange = useCallback((moreThan: number | null) => {
    onChange?.({ ...value, moreThan: { ...value?.moreThan, value: moreThan || undefined } })
  }, [onChange, value])

  const handleLessThanChange = useCallback((lessThan: number | null) => {
    onChange?.({ ...value, lessThan: { ...value?.lessThan, value: lessThan || undefined } })
  }, [onChange, value])

  const handlePositiveChange = useCallback((positive: boolean) => {
    onChange?.({ ...value, positive: { ...value?.positive, value: positive || undefined } })
  }, [onChange, value])

  const handleNegativeChange = useCallback((negative: boolean) => {
    onChange?.({ ...value, negative: { ...value?.negative, value: negative || undefined } })
  }, [onChange, value])

  const handleIntegerChange = useCallback((integer: boolean) => {
    onChange?.({ ...value, integer: { ...value?.integer, value: integer || undefined } })
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
        <InputNumber value={value?.max?.value as number | undefined} onChange={handleMaxChange} />
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
        <InputNumber value={value?.min?.value as number | undefined} onChange={handleMinChange} />
      </PropLayout>
      <PropLayout
        label={t('moreThan')}
        expressionSetter={
          <MessageInput
            value={value?.moreThan}
            onChange={(config) => handleConfigChange("moreThan", config)}
          />
        }
      >
        <InputNumber value={value?.moreThan?.value as number | undefined} onChange={handleMoreThanChange} />
      </PropLayout>
      <PropLayout
        label={t('lessThan')}
        expressionSetter={
          <MessageInput
            value={value?.lessThan}
            onChange={(config) => handleConfigChange("lessThan", config)}
          />
        }
      >
        <InputNumber value={value?.lessThan?.value as number | undefined} onChange={handleLessThanChange} />
      </PropLayout>
      <PropLayout
        label={t('positive')}
        expressionSetter={
          <MessageInput
            value={value?.positive}
            onChange={(config) => handleConfigChange("positive", config)}
          />
        }
      >
        <Switch
          checked={value?.positive?.value as boolean | undefined}
          onChange={handlePositiveChange}
        />
      </PropLayout>
      <PropLayout
        label={t('negative')}
        expressionSetter={
          <MessageInput
            value={value?.negative}
            onChange={(config) => handleConfigChange("negative", config)}
          />
        }
      >
        <Switch
          checked={value?.negative?.value as boolean | undefined}
          onChange={handleNegativeChange}
        />
      </PropLayout>
      <PropLayout
        label={t('integer')}
        expressionSetter={
          <MessageInput
            value={value?.integer}
            onChange={(config) => handleConfigChange("integer", config)}
          />
        }
      >
        <Switch
          checked={value?.integer?.value as boolean | undefined}
          onChange={handleIntegerChange}
        />
      </PropLayout>
    </>
  )
})
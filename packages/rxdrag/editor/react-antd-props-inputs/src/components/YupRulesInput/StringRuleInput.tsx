import { IYupConfig, YupString } from "@rxdrag/fieldy-yup-validation";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Checkbox, Input, InputNumber, Space } from "antd";
import { memo, useCallback } from "react"
import { PropLayout } from "../PropLayout";
import { MessageInput } from "./MessageInput";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export const StringRuleInput = memo((
  props: {
    value?: YupString,
    onChange?: (value?: YupString) => void
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

  const handleConfigChange = useCallback((name: string, config?: IYupConfig<unknown>) => {
    onChange?.({ ...value, [name]: config })
  }, [onChange, value])

  const handleExcludeEmptyChange = useCallback((e?: CheckboxChangeEvent) => {
    onChange?.({ ...value, matches: { ...value?.matches, excludeEmptyString: e?.target.checked } })
  }, [onChange, value])

  return (
    <>
      <PropLayout
        label={t('maxLength')}
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
        label={t('minLength')}
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
        label={t('matches')}
        expressionSetter={
          <MessageInput
            value={value?.matches}
            onChange={(config) => handleConfigChange("matches", config)}
          />
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input.TextArea />
          <Checkbox checked={value?.matches?.excludeEmptyString} onChange={handleExcludeEmptyChange} >{t("excludeEmptyString")}</Checkbox>
        </Space>
      </PropLayout>
    </>
  )
})
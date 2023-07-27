import { Select, Switch } from "antd"
import { memo, useCallback } from "react"
import { WhenType, YupConfig, YupString, YupType, YupValidateRules } from "@rxdrag/fieldy-yup-validation"
import { useSettersTranslate } from "@rxdrag/react-core"
import { NumberRuleInput } from "./NumberRuleInput"
import { ArrayRuleInput } from "./ArrayRuleInput"
import { DateRuleInput } from "./DateRuleInput"
import { StringRuleInput } from "./StringRuleInput"
import { ObjectRuleInput } from "./ObjectRuleInput"
import { PropLayout } from "../PropLayout"
import { MessageInput } from "./MessageInput"
import { WhenInput } from "./WhenInput"

export const YupRulesInput = memo((
  props: {
    value?: YupValidateRules,
    onChange?: (value?: YupValidateRules) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()

  const handleRequiredChange = useCallback((checked: boolean) => {
    onChange?.({ ...value, config: { ...value?.config, required: checked } })
  }, [onChange, value])

  const handleTypeChange = useCallback((typeValue: string) => {
    onChange?.({ ...value, type: { ...value?.type, value: typeValue } })
  }, [onChange, value])

  const handleWhenChange = useCallback((whenType?: WhenType) => {
    onChange?.({ ...value, config: { ...value?.config, when: whenType } })
  }, [onChange, value])

  const handleConfigChange = useCallback((config?: YupConfig) => {
    onChange?.({ ...value, config: config })
  }, [onChange, value])

  return (
    <>
      <PropLayout
        label={t('requried')}
        expressionSetter={<MessageInput />}
      >
        <Switch checked={value?.config?.required} onChange={handleRequiredChange} />
      </PropLayout>
      <PropLayout
        label={t('validationType')}
        expressionSetter={<MessageInput />}
      >
        <Select
          allowClear
          value={value?.type?.value}
          onChange={handleTypeChange}
          options={[
            { value: 'email', label: t('email') },
            { value: 'url', label: t('url') },
            { value: 'uuid', label: t('UUID') },
            { value: 'string', label: t('string') },
            { value: 'number', label: t('number') },
            { value: 'date', label: t('date') },
            { value: 'boolean', label: t('boolean') },
            { value: 'array', label: t('array') },
            { value: 'object', label: t('object') },
          ]}
        />
      </PropLayout>
      {
        value?.type?.value === YupType.array &&
        <ArrayRuleInput />
      }
      {
        // value?.type?.value === YupType.boolean &&
        // <BooleanRuleInput />
      }
      {
        value?.type?.value === YupType.date &&
        <DateRuleInput />
      }
      {
        value?.type?.value === YupType.number &&
        <NumberRuleInput />
      }
      {
        value?.type?.value === YupType.object &&
        <ObjectRuleInput />
      }
      {
        value?.type?.value === YupType.string &&
        <StringRuleInput value={value?.config as YupString | undefined} onChange={handleConfigChange} />
      }
      {
        <WhenInput value={value?.config?.when} onChange={handleWhenChange} />
      }
    </>
  )
})
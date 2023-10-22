import { Select, Switch } from "antd"
import { memo, useCallback } from "react"
import { IYupConfig, TestType, WhenType, YupNumber, YupRules, YupString, YupType, IYupValidateSchema } from "@rxdrag/fieldy-yup-validation"
import { NumberRuleInput } from "./NumberRuleInput"
import { ArrayRuleInput } from "./ArrayRuleInput"
import { DateRuleInput } from "./DateRuleInput"
import { StringRuleInput } from "./StringRuleInput"
import { ObjectRuleInput } from "./ObjectRuleInput"
import { MessageInput } from "./MessageInput"
import { WhenInput } from "./WhenInput"
import { TestInput } from "./TestInput"
import { useTranslate } from "@rxdrag/react-locales"
import { PropLayout } from "./PropLayout"

export const YupRulesInput = memo((
  props: {
    value?: IYupValidateSchema,
    onChange?: (value?: IYupValidateSchema) => void
  }
) => {
  const { value, onChange } = props;
  const t = useTranslate()

  const handleRequiredChange = useCallback((checked: boolean) => {
    onChange?.({ ...value, required: checked })
  }, [onChange, value])

  const handleTypeChange = useCallback((typeValue: string) => {
    onChange?.({ ...value, type: { ...value?.type, value: typeValue } })
  }, [onChange, value])

  const handleWhenChange = useCallback((whenType?: WhenType) => {
    onChange?.({ ...value, rules: { ...value?.rules, when: whenType } })
  }, [onChange, value])

  const handleTestChange = useCallback((testType?: TestType) => {
    onChange?.({ ...value, rules: { ...value?.rules, test: testType } })
  }, [onChange, value])

  const handleRulesChange = useCallback((rules?: YupRules) => {
    onChange?.({ ...value, rules: rules })
  }, [onChange, value])


  const handleTypeConfigChange = useCallback((config?: IYupConfig<unknown>) => {
    onChange?.({ ...value, type: config as IYupConfig<string | YupType> })
  }, [onChange, value])

  return (
    <>
      <PropLayout
        label={t('requried')}
      >
        <Switch
          checked={value?.required}
          onChange={handleRequiredChange}
        />
      </PropLayout>
      <PropLayout
        label={t('validationType')}
        expressionSetter={
          <MessageInput
            value={value?.type}
            onChange={handleTypeConfigChange}
          />}
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
            //暂时不支持数组跟对象
            // { value: 'array', label: t('array') },
            // { value: 'object', label: t('object') },
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
        <NumberRuleInput value={value?.rules as YupNumber | undefined} onChange={handleRulesChange} />
      }
      {
        value?.type?.value === YupType.object &&
        <ObjectRuleInput />
      }
      {
        value?.type?.value === YupType.string &&
        <StringRuleInput value={value?.rules as YupString | undefined} onChange={handleRulesChange} />
      }
      {
        <WhenInput value={value?.rules?.when} onChange={handleWhenChange} />
      }
      {
        <TestInput value={value?.rules?.test} onChange={handleTestChange} />
      }
    </>
  )
})
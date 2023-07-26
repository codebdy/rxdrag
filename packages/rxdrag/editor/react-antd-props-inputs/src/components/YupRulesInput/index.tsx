import { Form, Select } from "antd"
import { memo, useCallback } from "react"
import { YupType, YupValidateRules } from "@rxdrag/fieldy-yup-validation"
import { useSettersTranslate } from "@rxdrag/react-core"
import { NumberRuleInput } from "./NumberRuleInput"
import { ArrayRuleInput } from "./ArrayRuleInput"
import { BooleanRuleInput } from "./BooleanRuleInput"
import { DateRuleInput } from "./DateRuleInput"
import { StringRuleInput } from "./StringRuleInput"
import { ObjectRuleInput } from "./ObjectRuleInput"

export const YupRulesInput = memo((
  props: {
    value?: YupValidateRules,
    onChange?: (value?: YupValidateRules) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()

  const handleTypeChange = useCallback((typeValue: string) => {
    onChange?.({ ...value, type: typeValue })
  }, [onChange, value])

  return (
    <>
      <Form.Item label={t('validationType')}>
        <Select
          allowClear
          value={value?.type}
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
      </Form.Item>
      {
        value?.type === YupType.array &&
        <ArrayRuleInput />
      }
      {
        value?.type === YupType.boolean &&
        <BooleanRuleInput />
      }
      {
        value?.type === YupType.date &&
        <DateRuleInput />
      }
      {
        value?.type === YupType.number &&
        <NumberRuleInput />
      }
      {
        value?.type === YupType.object &&
        <ObjectRuleInput />
      }
      {
        value?.type === YupType.string &&
        <StringRuleInput />
      }
    </>
  )
})
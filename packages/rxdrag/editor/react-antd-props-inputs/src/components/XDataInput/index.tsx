import { memo, useCallback } from "react"
import { YupRulesInput } from "../YupRulesInput"
import { IFieldMeta, IValidateSchema } from "@rxdrag/fieldy";
import { Form, Input } from "antd";
import { ValueInput } from "../ValueInput";
import { useSettersTranslate } from "@rxdrag/react-core";

export const XDataInput = memo((
  props: {
    value?: IFieldMeta,
    onChange?: (value?: IFieldMeta) => void,
    hasRules?: boolean,
  }
) => {
  const { value, onChange, hasRules } = props;
  const t = useSettersTranslate()

  const handleNameChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, name: e?.target.value })
  }, [onChange, value])

  const handleDefaultValueChange = useCallback((defaultValue?: unknown) => {
    onChange?.({ ...value, defaultValue })
  }, [onChange, value])

  const handleRulesChange = useCallback((rules?: IValidateSchema) => {
    onChange?.({ ...value, validateRules: rules })
  }, [onChange, value])

  return (
    <>
      <Form.Item label={t("name")}>
        <Input
          value={value?.name}
          onChange={handleNameChange}
        />
      </Form.Item>
      <Form.Item label={t("defaultValue")}      >
        <ValueInput
          value={value?.defaultValue}
          onChange={handleDefaultValueChange}
        />
      </Form.Item>
      {
        hasRules && <YupRulesInput
          value={value?.validateRules}
          onChange={handleRulesChange}
        />
      }
    </>
  )
})
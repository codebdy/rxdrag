import { FieldType, IValidateSchema } from "@rxdrag/fieldy";
import { YupRulesInput } from "@rxdrag/react-antd-props-inputs";
import { memo, useCallback } from "react"
import { IModelMeta } from "../../interfaces";
import { Form, Input } from "antd";
import { useSettersTranslate } from "@rxdrag/react-core";
import { DefaultValue } from "./DefaultValue";

export const Customized = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldType?: FieldType,
    hasRules?: boolean,
  }
) => {
  const { value, onChange, fieldType, hasRules } = props;
  const t = useSettersTranslate()

  const handleNameChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ fieldType, ...value, customizedName: e?.target.value })
  }, [fieldType, onChange, value])


  const handleRulesChange = useCallback((rules?: IValidateSchema) => {
    const newValue = { fieldType, ...value, validateRules: rules }
    onChange?.(newValue)
  }, [fieldType, onChange, value])

  return (
    <>
      <Form.Item label={t("customized")}>
        <Input
          value={value?.customizedName || ""}
          onChange={handleNameChange}
          allowClear
        />
      </Form.Item>
      <DefaultValue
        value={value}
        onChange={onChange}
        fieldType={fieldType}
      />
      {
        hasRules && <YupRulesInput
          value={value?.validateRules}
          onChange={handleRulesChange}
        />
      }
    </>
  )
})
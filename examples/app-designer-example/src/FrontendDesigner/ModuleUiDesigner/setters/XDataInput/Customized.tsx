import { IValidateSchema } from "@rxdrag/fieldy";
import { YupRulesInput } from "@rxdrag/react-antd-props-inputs";
import { memo, useCallback } from "react"
import { IModelMeta } from "../../interfaces";
import { Form, Input } from "antd";
import { useSettersTranslate } from "@rxdrag/react-core";
import { LabelInput } from "./LabelInput";
import { FieldOptions } from "@rxdrag/react-antd-materials";

export const Customized = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldOptions?: FieldOptions,
  }
) => {
  const { value, onChange, fieldOptions } = props;
  const { fieldType, hasRules, hasLabel } = fieldOptions || {}
  const t = useSettersTranslate()

  const handleNameChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ type: fieldType, ...value, name: e?.target.value })
  }, [fieldType, onChange, value])


  const handleRulesChange = useCallback((rules?: IValidateSchema) => {
    const newValue = { fieldType, ...value, validateRules: rules }
    onChange?.(newValue)
  }, [fieldType, onChange, value])

  return (
    <>
      <Form.Item label={t("customizedName")}>
        <Input
          value={value?.name || ""}
          onChange={handleNameChange}
          allowClear
        />
      </Form.Item>
      {hasLabel && <LabelInput value={value} onChange={onChange} />}
      {
        hasRules && <YupRulesInput
          value={value?.validateRules}
          onChange={handleRulesChange}
        />
      }
    </>
  )
})
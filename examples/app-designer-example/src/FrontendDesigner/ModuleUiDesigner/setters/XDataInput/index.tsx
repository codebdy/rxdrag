import { memo, useCallback } from "react"
import { FieldType, IFieldMeta, IValidateSchema } from "@rxdrag/fieldy";
import { Form, Input, Select } from "antd";
import { useSettersTranslate } from "@rxdrag/react-core";
import { ValueInput, YupRulesInput } from "@rxdrag/react-antd-props-inputs";
import { useEntities } from "../../../hooks/useEntities";

export const XDataInput = memo((
  props: {
    value?: IFieldMeta,
    onChange?: (value?: IFieldMeta) => void,
    hasRules?: boolean,
    fieldType?: FieldType,
  }
) => {
  const { value, onChange, hasRules, fieldType } = props;
  const t = useSettersTranslate()
  const entities = useEntities()
  const handleNameChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ type: fieldType, ...value, name: e?.target.value })
  }, [fieldType, onChange, value])

  const handleDefaultValueChange = useCallback((defaultValue?: unknown) => {
    onChange?.({ type: fieldType, ...value, defaultValue })
  }, [fieldType, onChange, value])

  const handleRulesChange = useCallback((rules?: IValidateSchema) => {
    onChange?.({ type: fieldType, ...value, validateRules: rules })
  }, [fieldType, onChange, value])

  return (
    <>
      <Form.Item label={t("entity")}>
        <Select
          allowClear
          options={entities?.map(ent => ({ value: ent.uuid, label: ent.name }))}
        />
      </Form.Item>
      {
        fieldType === "normal" && <Form.Item label={t("defaultValue")}      >
          <ValueInput
            value={value?.defaultValue}
            onChange={handleDefaultValueChange}
          />
        </Form.Item>
      }

      {
        hasRules && <YupRulesInput
          value={value?.validateRules}
          onChange={handleRulesChange}
        />
      }
    </>
  )
})
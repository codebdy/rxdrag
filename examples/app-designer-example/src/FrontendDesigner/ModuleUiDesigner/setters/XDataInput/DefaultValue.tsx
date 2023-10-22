import { FieldType } from "@rxdrag/fieldy";
import { ValueInput } from "@rxdrag/react-antd-props-inputs";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form } from "antd";
import { memo, useCallback } from "react"
import { IModelMeta } from "../../interfaces";

export const DefaultValue = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldType?: FieldType,
  }
) => {
  const { value, onChange, fieldType } = props;
  const t = useSettersTranslate()
  const handleDefaultValueChange = useCallback((defaultValue?: unknown) => {
    const newValue = { fieldType, ...value, defaultValue }
    if (!defaultValue) {
      newValue.defaultValue = defaultValue
    }
    onChange?.(newValue)
  }, [fieldType, onChange, value])

  return (
    fieldType === "normal" && <Form.Item label={t("defaultValue")}      >
      <ValueInput
        value={value?.defaultValue}
        onChange={handleDefaultValueChange}
      />
    </Form.Item>
  )
})
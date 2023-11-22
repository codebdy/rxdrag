import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Input } from "antd";
import { memo, useCallback } from "react";
import { IModelMeta } from "../../interfaces";

export const LabelInput = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, label: e.target.value })
  }, [onChange, value])

  return (
    <Form.Item label={t("label")}>
      <Input
        allowClear
        value={value?.label}
        onChange={handleChange}
      />
    </Form.Item>
  )
})
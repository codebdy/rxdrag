import { FieldType } from "@rxdrag/fieldy";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form } from "antd";
import { memo, useCallback } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { EntitySelect } from "../EntitySelect";

export const EntityInput = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldType?: FieldType,
  }
) => {
  const { value, onChange, fieldType } = props;
  const t = useSettersTranslate()

  const handleEntityChange = useCallback((modelMetaId?: string) => {
    if (modelMetaId) {
      onChange?.({ fieldType, ...value, modelMetaId, type: ModelType.Entity, validateRules: null })
    } else {
      onChange?.({ fieldType, ...value, modelMetaId: null, type: null })
    }

  }, [fieldType, onChange, value])


  return (
    <Form.Item label={t("entity")}>
      <EntitySelect
        value={value?.modelMetaId}
        onChange={handleEntityChange}
      />
    </Form.Item>
  )
})
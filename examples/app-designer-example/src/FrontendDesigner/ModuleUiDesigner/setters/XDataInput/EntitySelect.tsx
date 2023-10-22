import { FieldType } from "@rxdrag/fieldy";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Select } from "antd";
import { memo, useCallback } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { useEntities } from "../../../hooks/useEntities";

export const EntitySelect = memo((
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


  const entities = useEntities()
  return (
    <Form.Item label={t("entity")}>
      <Select
        allowClear
        options={entities?.map(ent => ({ value: ent.uuid, label: ent.label || ent.name }))}
        value={value?.modelMetaId}
        onChange={handleEntityChange}
      />
    </Form.Item>
  )
})
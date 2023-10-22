import { FieldType } from "@rxdrag/fieldy";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Select } from "antd";
import { memo, useCallback } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { useRecentEntity } from "../../../hooks/useRecentEntity";

export const AttributeSelect = memo((
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


  const entity = useRecentEntity()

  return (
    entity
      ? <Form.Item label={t("attribute")}>
        <Select
          allowClear
          options={entity?.attributes?.map(attr => ({ value: attr.uuid, label: attr.label || attr.name }))}
          value={value?.modelMetaId}
          onChange={handleEntityChange}
        />
      </Form.Item>
      : <></>
  )
})
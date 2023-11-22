import { FieldType } from "@rxdrag/fieldy";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Select } from "antd";
import { memo, useCallback, useMemo } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { useRecentEntity } from "../../../hooks/useRecentEntity";
import { LabelInput } from "./LabelInput";

export const AttributeSelect = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldType?: FieldType,
    hasLabel?: boolean,
  }
) => {
  const { value, onChange, fieldType, hasLabel } = props;
  const t = useSettersTranslate()
  const entity = useRecentEntity()

  const selectedAssoc = useMemo(() => entity?.associations.find(asso => asso.id === value?.modelMetaId), [entity?.associations, value?.modelMetaId])

  const handleEntityChange = useCallback((modelMetaId?: string) => {
    if (modelMetaId) {
      const attr = entity?.attributes.find(att => att.uuid === modelMetaId)
      onChange?.({ type: fieldType, ...value, modelMetaId, modelType: ModelType.Attribute, validateRules: null, label: attr?.label, name: attr?.name })
    } else {
      onChange?.({ type: fieldType, ...value, modelMetaId: null, modelType: null, name: null })
    }

  }, [entity?.attributes, fieldType, onChange, value])

  return (
    entity && !selectedAssoc
      ? <>
        <Form.Item label={t("attribute")}>
          <Select
            allowClear
            options={entity?.attributes?.map(attr => ({
              value: attr.uuid,
              label: attr?.label ? `${attr.label}(${attr.name})` : attr.name,
            }))}
            value={value?.modelMetaId}
            onChange={handleEntityChange}
          />
        </Form.Item>
        {
          value?.modelMetaId && hasLabel &&
          <LabelInput value={value} onChange={onChange} />
        }
      </>
      : <></>
  )
})
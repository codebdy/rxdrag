import { FieldType } from "@rxdrag/fieldy";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Select } from "antd";
import { memo, useCallback } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { useRecentEntity } from "../../../hooks/useRecentEntity";
import { LabelInput } from "./LabelInput";
import React from "react";

export const AssociationSelect = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldType?: FieldType,
  }
) => {
  const { value, onChange, fieldType } = props;
  const t = useSettersTranslate()

  const entity = useRecentEntity()

  const handleEntityChange = useCallback((modelMetaId?: string) => {
    if (modelMetaId) {
      const attr = entity?.attributes.find(att => att.uuid === modelMetaId)
      onChange?.({ fieldType, ...value, modelMetaId, type: ModelType.Association, validateRules: null, label: attr?.label })
    } else {
      onChange?.({ fieldType, ...value, modelMetaId: null, type: null, label: "" })
    }

  }, [entity?.attributes, fieldType, onChange, value])

  return (
    entity
      ? <>
        <Form.Item label={t("attribute")}>
          <Select
            allowClear
            options={entity?.associations?.map(asso => ({ value: asso.id, label: asso.name }))}
            value={value?.modelMetaId}
            onChange={handleEntityChange}
          />
        </Form.Item>
        {
          value?.modelMetaId &&
          <LabelInput value={value} onChange={onChange} />
        }
      </>
      : <></>
  )
})
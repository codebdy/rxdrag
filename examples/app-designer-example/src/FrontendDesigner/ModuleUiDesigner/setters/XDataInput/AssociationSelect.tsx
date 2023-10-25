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
    hasLabel?: boolean,
  }
) => {
  const { value, onChange, fieldType, hasLabel } = props;
  const t = useSettersTranslate()

  const entity = useRecentEntity()

  const handleEntityChange = useCallback((modelMetaId?: string) => {
    if (modelMetaId) {
      const assoc = entity?.associations.find(asso => asso.id === modelMetaId)
      onChange?.({ type: fieldType, ...value, modelMetaId, modelType: ModelType.Association, validateRules: null, label: assoc?.label, name: assoc?.name })
    } else {
      onChange?.({ type: fieldType, ...value, modelMetaId: null, modelType: null, })
    }

  }, [entity?.associations, fieldType, onChange, value])

  return (
    entity
      ? <>
        <Form.Item label={t("association")}>
          <Select
            allowClear
            options={entity?.associations?.map(asso => ({
              value: asso.id,
              label: asso?.label ? `${asso.label}(${asso.name})` : asso.name,
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
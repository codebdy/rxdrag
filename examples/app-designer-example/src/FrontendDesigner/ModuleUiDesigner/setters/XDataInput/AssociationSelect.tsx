import { useSettersTranslate } from "@rxdrag/react-core";
import { Form, Select } from "antd";
import { memo, useCallback, useMemo } from "react";
import { IModelMeta, ModelType } from "../../interfaces";
import { useRecentEntity } from "../../../hooks/useRecentEntity";
import { LabelInput } from "./LabelInput";
import React from "react";
import { AssociationType } from "../../interfaces/AssociationMeta";

export const AssociationSelect = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    //fieldType?: FieldType,
    hasLabel?: boolean,
  }
) => {
  const { value, onChange, hasLabel } = props;
  const t = useSettersTranslate()

  const entity = useRecentEntity()

  const selectedAttribute = useMemo(()=>entity?.attributes.find(attr => attr.uuid === value?.modelMetaId), [entity?.attributes, value?.modelMetaId])

  const handleEntityChange = useCallback((modelMetaId?: string) => {
    if (modelMetaId) {
      const assoc = entity?.associations.find(asso => asso.id === modelMetaId)
      const fieldType = assoc?.associationType === AssociationType.HasMany ? "array" : "object"
      onChange?.({ type: fieldType, ...value, modelMetaId, modelType: ModelType.Association, validateRules: null, label: assoc?.label, name: assoc?.name })
    } else {
      onChange?.({ type: null, ...value, modelMetaId: null, modelType: null, name: null })
    }

  }, [entity?.associations, onChange, value])

  return (
    entity && !selectedAttribute
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
import { memo } from "react"
import { IModelMeta } from "../../interfaces";
import { Customized } from "./Customized";
import { EntityInput } from "./EntityInput";
import { AttributeSelect } from "./AttributeSelect";
import { AssociationSelect } from "./AssociationSelect";
import { FieldOptions } from "@rxdrag/react-antd-materials";
import { DefaultValue } from "./DefaultValue";

export const XDataInput = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldOptions?: FieldOptions,
  }
) => {
  const { value, onChange, fieldOptions } = props;
  const { fieldType, hasLabel } = fieldOptions || {}
  return (
    <>
      {
        (fieldType === "form" || fieldType === "object" || fieldType === "array") &&
        <EntityInput
          fieldType={fieldType}
          value={value}
          onChange={onChange}
        />
      }
      {
        fieldType === "normal" &&
        <AttributeSelect
          fieldType={fieldType}
          hasLabel = {hasLabel}
          value={value}
          onChange={onChange}
        />
      }
      {
        (fieldType === "object" || fieldType === "array") &&
        <AssociationSelect
          fieldType={fieldType}
          hasLabel = {hasLabel}
          value={value}
          onChange={onChange}
        />
      }
      {
        !value?.modelMetaId && <Customized
          value={value}
          onChange={onChange}
          fieldOptions={fieldOptions}
        />
      }
      {
        fieldOptions?.hasDefaultValue && <DefaultValue
          value={value}
          onChange={onChange}
          fieldType={fieldType}
        />
      }
    </>
  )
})
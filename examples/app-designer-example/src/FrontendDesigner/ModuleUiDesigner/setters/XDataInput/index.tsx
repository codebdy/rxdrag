import { memo } from "react"
import { IModelMeta } from "../../interfaces";
import { Customized } from "./Customized";
import { EntityInput } from "./EntityInput";
import { AttributeSelect } from "./AttributeSelect";
import { AssociationSelect } from "./AssociationSelect";
import { FieldOptions } from "@rxdrag/react-antd-materials";
import { DefaultValue } from "./DefaultValue";
import { useIsEntitySelected } from "./useIsEntitySelected";
import { useIsAssociationSelected } from "./useIsAssociationSelected";

export const XDataInput = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    fieldOptions?: FieldOptions,
  }
) => {
  const { value, onChange, fieldOptions } = props;
  const { fieldType, hasLabel } = fieldOptions || {}
  const isEntitySelected = useIsEntitySelected(value?.modelMetaId)
  const isAssociationSelected = useIsAssociationSelected(value?.modelMetaId)

  return (
    <>
      {
        (fieldType === "form" || fieldType === "object" || fieldType === "array") && !isAssociationSelected &&
        <EntityInput
          fieldType={fieldType}
          value={value}
          onChange={onChange}
        />
      }
      {
        fieldType === "normal" && !isEntitySelected &&
        <AttributeSelect
          fieldType={fieldType}
          hasLabel={hasLabel}
          value={value}
          onChange={onChange}
        />
      }
      {
        (fieldType === "normal" || fieldType === "object" || fieldType === "array") && !isEntitySelected &&
        <AssociationSelect
          //fieldType={fieldType}
          hasLabel={hasLabel}
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
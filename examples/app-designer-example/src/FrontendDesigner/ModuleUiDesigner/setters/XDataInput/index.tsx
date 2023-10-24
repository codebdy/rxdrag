import { memo } from "react"
import { FieldType } from "@rxdrag/fieldy";
import { IModelMeta } from "../../interfaces";
import { Customized } from "./Customized";
import { EntityInput } from "./EntityInput";
import { AttributeSelect } from "./AttributeSelect";
import { AssociationSelect } from "./AssociationSelect";

export const XDataInput = memo((
  props: {
    value?: IModelMeta,
    onChange?: (value?: IModelMeta) => void,
    hasRules?: boolean,
    fieldType?: FieldType,
  }
) => {
  const { value, onChange, hasRules, fieldType } = props;

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
          value={value}
          onChange={onChange}
        />
      }
      {
        (fieldType === "object" || fieldType === "array") &&
        <AssociationSelect
          fieldType={fieldType}
          value={value}
          onChange={onChange}
        />
      }
      {
        !value?.modelMetaId && <Customized
          value={value}
          onChange={onChange}
          fieldType={fieldType}
          hasRules={hasRules}
        />
      }

    </>
  )
})
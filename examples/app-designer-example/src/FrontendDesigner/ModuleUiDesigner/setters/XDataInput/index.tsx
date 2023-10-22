import { memo } from "react"
import { FieldType } from "@rxdrag/fieldy";
import { IModelMeta } from "../../interfaces";
import { Customized } from "./Customized";
import { EntitySelect } from "./EntitySelect";

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
        fieldType === "form" &&
        <EntitySelect
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
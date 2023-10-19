import { Type } from "@rxdrag/uml-schema";
import { memo } from "react"
import { TypeSelect } from "../TypeSelect";
import { TypeUuidSelect } from "../TypeUuidSelect";

export const ArgTypeInput = memo((
  props: {
    id: string,
    type: Type,
    typeId?: string,
    onTypeChange: (uuid: string, type?: Type, typeId?: string) => void,
  }
) => {
  const { id, type, typeId, onTypeChange } = props;

  return (
    <div style={{ display: "flex" }}>
      <TypeSelect
        style={{ width: 150 }}
        value={type}
        onChange={(value) => onTypeChange(id, value)}
      />
      <TypeUuidSelect
        type={type}
        style={{ width: 150, marginLeft: 16 }}
        value={typeId}
        onChange={(value) => onTypeChange(id, type, value)}
      />
    </div>
  )
})
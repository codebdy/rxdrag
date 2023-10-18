import { memo } from "react"
import { TypeSelect } from "../../TypeSelect";
import { TypeUuidSelect } from "../../TypeUuidSelect";
import { Type } from "UmlEditor/meta";

export const ArgTypeInput = memo((
  props: {
    uuid: string,
    type: Type,
    typeUuid?: string,
    onTypeChange: (uuid: string, type?: Type, typeUuid?: string) => void,
  }
) => {
  const { uuid, type, typeUuid, onTypeChange } = props;

  return (
    <div style={{ display: "flex" }}>
      <TypeSelect
        style={{ width: 150 }}
        value={type}
        onChange={(value) => onTypeChange(uuid, value)}
      />
      <TypeUuidSelect
        type={type}
        style={{ width: 150, marginLeft: 16 }}
        value={typeUuid}
        onChange={(value) => onTypeChange(uuid, type, value)}
      />
    </div>
  )
})
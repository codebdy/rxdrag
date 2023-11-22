import { memo } from "react"
import { useEntities } from "../../hooks/useEntities"
import { Select } from "antd";

export const EntitySelect = memo((
  props: {
    value?: string | null,
    onChange?: (value?: string) => void
  }
) => {
  const { value, onChange } = props;
  const entities = useEntities()
  return (
    <Select
      allowClear
      options={entities?.map(ent => ({ value: ent.uuid, label: ent.label || ent.name }))}
      value={value}
      onChange={onChange}
    />
  )
})
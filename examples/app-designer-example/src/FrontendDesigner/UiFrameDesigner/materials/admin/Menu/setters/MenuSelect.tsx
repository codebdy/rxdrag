import { ID } from "@rxdrag/shared";
import { Select } from "antd";
import { memo } from "react"
import { useAppFrontend } from "../../../../../../hooks/useAppFrontend";

export const MenuSelect = memo((
  props: {
    value?: ID,
    onChange?: (value?: ID) => void
  }
) => {
  const { value, onChange } = props;
  const appFront = useAppFrontend()

  return (
    <Select
      value={value}
      options={appFront?.menus?.map(menu => ({ value: menu.id, label: menu.title }))}
      onChange={onChange}
    />
  )
})
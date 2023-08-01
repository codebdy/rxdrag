import { Switch as AntdSwitch } from "antd"
import { mapComponent } from "../../hocs/mapComponent"

export const Switch = mapComponent(AntdSwitch, { value: "checked" })
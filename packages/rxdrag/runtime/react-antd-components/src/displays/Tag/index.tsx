import { Tag as AntdTag } from "antd"
import { mapComponent } from "../../hocs/mapComponent"

export const Tag = mapComponent(AntdTag, { value: 'children' })
import { Tag as AntdTag } from "antd"
import { mapComponent } from "runner/ComponentRender/hocs/mapComponent"

export const Tag = mapComponent(AntdTag, { value: 'children' })
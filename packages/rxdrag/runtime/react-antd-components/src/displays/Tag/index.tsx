import { mapComponent } from "@rxdrag/react-shared"
import { Tag as AntdTag } from "antd"

export const Tag = mapComponent(AntdTag, { value: 'children' })
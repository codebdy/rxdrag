import { Tag as AntdTag } from "antd"
import { mapComponent } from "@rxdrag/react-runner"

export const Tag = mapComponent(AntdTag, { value: 'children' })
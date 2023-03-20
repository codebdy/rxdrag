import { mapComponent } from "@rxdrag/react-shared"
import { Button as AntdButton } from "antd"

export const Button = mapComponent(AntdButton, { title: 'children' })
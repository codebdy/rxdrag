import { mapComponent } from "@rxdrag/react-runner"
import { Button as AntdButton } from "antd"

export const Button = mapComponent(AntdButton, { title: 'children' })
import { Button as AntdButton } from "antd"
import { mapComponent } from "../hocs/mapComponent"

export const Button = mapComponent(AntdButton, { title: 'children' })
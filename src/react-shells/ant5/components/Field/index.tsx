import { Form } from "antd"
import { INodeMeta } from "core"
import { memo } from "react"

//本组件强依赖fieldy
export type FieldProps = {
  value?: any,
  onChange?: (value?: any) => void,
  colon?: boolean,
  extra?: string,
  help?: string,
  hidden?: boolean,
  initialValue?: any,
  label?: string,
  labelAlign?: 'left' | 'right',
  labelCol?: any,
  wrapperCol?: any,
  validateStatus?: 'success' | 'warning' | 'error' | 'validating',
  xComponent?: INodeMeta
}
export const Field = memo((props: FieldProps) => {
  const { value, onChange, xComponent, ...other } = props
  return (
    <Form.Item {...other}>
      
    </Form.Item>
  )
})
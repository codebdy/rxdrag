import { Form } from "antd"
import { memo } from "react"
import { IConfig } from "../interfaces";

export const ConfigForm = memo((
  props: {
    value?: IConfig,
    onChange?: (value: IConfig) => void
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      colon={false}
    >
      {children}
    </Form>
  )
})
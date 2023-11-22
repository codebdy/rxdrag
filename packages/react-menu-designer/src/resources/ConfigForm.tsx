import { Form } from "antd"
import { memo, useCallback, useEffect } from "react"
import { IConfig } from "../interfaces";

export const ConfigForm = memo((
  props: {
    value?: IConfig,
    onChange?: (value: IConfig) => void
    children?: React.ReactNode,
  }
) => {
  const { value, onChange, children } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(value)
  }, [form, value])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValuesChange = useCallback((changeValue: any, values: any) => {
    onChange?.({ ...value, ...values })
  }, [onChange, value])

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      colon={false}
      onValuesChange={handleValuesChange}
    >
      {children}
    </Form>
  )
})
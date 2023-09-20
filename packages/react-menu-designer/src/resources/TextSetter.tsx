import { Form, Input } from "antd"
import { memo } from "react"
import { ConfigSetterProps } from "../interfaces"
import { IConfigText } from "./types";

export const TextSetter = memo((
  props: ConfigSetterProps<IConfigText>
) => {
  const { value, onChange } = props;

  return (
    <Form>
      <Form.Item label="标题">
        <Input />
      </Form.Item>
    </Form>
  )
})
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import { memo, useCallback, useState } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"

export type ColValue = {
  span?: number,
  flex?: string | number,
  offset?: number,
  order?: number,
  pull?: number,
  push?: number,
}

export type ValueType = ColValue & {
  xs?: ColValue,
  sm?: ColValue,
  md?: ColValue,
  lg?: ColValue,
  xl?: ColValue,
  xxl?: ColValue,
  [key: string]: ColValue | string | number | undefined,
}

export type ColInputProps = {
  title?: string,
  subTitles?: {
    span?: string,
    flex?: string,
    offset?: string,
    order?: string,
    pull?: string,
    push?: string,
  },
  value?: ValueType,
  onChange?: (value?: ValueType) => void
}

export const ColInput = memo((props: ColInputProps) => {
  const { title, subTitles, value, onChange } = props
  const [screen, setScreen] = useState("all")

  const handleScreenChange = useCallback((val: string) => {
    setScreen(val)
  }, []);

  const handleSpanChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, span: val || undefined })
    }
  }, [onChange, screen, value])

  return (
    <Fold className="rx-col-input">
      <FoldBase title={title}>
        <Select
          value={screen}
          options={[
            { label: "All", value: 'all' },
            { label: "xs", value: 'xs' },
            { label: "sm", value: 'sm' },
            { label: "md", value: 'md' },
            { label: "lg", value: 'lg' },
            { label: "xl", value: 'xl' },
            { label: "xxl", value: 'xxl' },
          ]}
          onChange={handleScreenChange}
        ></Select>
      </FoldBase>
      <FoldExtra >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label={subTitles?.span} labelAlign="right">
              <InputNumber value={(value?.[screen] as ColValue)?.span} max={24} onChange={handleSpanChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.flex} labelAlign="right">
              <Input value={(value?.[screen] as ColValue)?.flex} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.offset} labelAlign="right">
              <InputNumber value={(value?.[screen] as ColValue)?.offset} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.order} labelAlign="right">
              <InputNumber value={(value?.[screen] as ColValue)?.order} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.pull} labelAlign="right">
              <InputNumber value={(value?.[screen] as ColValue)?.pull} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.push} labelAlign="right">
              <InputNumber value={(value?.[screen] as ColValue)?.push} />
            </Form.Item>
          </Col>
        </Row>
      </FoldExtra>
    </Fold>
  )
})


import { Col, Form, InputNumber, Row, Select } from "antd"
import { memo } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"

export type ColValue = {
  span?: string | number,
  flex?: number,
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

  return (
    <Fold className="rx-col-input">
      <FoldBase title={title}>
        <Select
          defaultValue="all"
          options={[
            { label: "All", value: 'all' },
            { label: "xs", value: 'xs' },
            { label: "sm", value: 'sm' },
            { label: "md", value: 'md' },
            { label: "lg", value: 'lg' },
            { label: "xl", value: 'xl' },
            { label: "xxl", value: 'xxl' },
          ]}
        ></Select>
      </FoldBase>
      <FoldExtra >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label={subTitles?.span} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.flex} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.offset} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.order} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.pull} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.push} labelAlign="right">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </FoldExtra>
    </Fold>
  )
})


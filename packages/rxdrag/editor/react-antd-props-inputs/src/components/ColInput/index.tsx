import React from "react"
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react"
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

export type ColValueType = ColValue & {
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
  value?: ColValueType,
  onChange?: (value?: ColValueType) => void
}

export const ColInput = memo((props: ColInputProps) => {
  const { title, subTitles, value, onChange } = props
  const [screen, setScreen] = useState("all")

  const handleScreenChange = useCallback((val: string) => {
    setScreen(val)
  }, []);

  const spanValue = useMemo(() => {
    if (screen === "all") {
      return value?.span
    } else {
      return (value?.[screen] as ColValue)?.span
    }
  }, [screen, value])

  const flexValue = useMemo(() => {
    if (screen === "all") {
      return value?.flex
    } else {
      return (value?.[screen] as ColValue)?.flex
    }
  }, [screen, value])

  const offsetValue = useMemo(() => {
    if (screen === "all") {
      return value?.offset
    } else {
      return (value?.[screen] as ColValue)?.offset
    }
  }, [screen, value])

  const orderValue = useMemo(() => {
    if (screen === "all") {
      return value?.order
    } else {
      return (value?.[screen] as ColValue)?.order
    }
  }, [screen, value])

  const pullValue = useMemo(() => {
    if (screen === "all") {
      return value?.pull
    } else {
      return (value?.[screen] as ColValue)?.pull
    }
  }, [screen, value])

  const pushValue = useMemo(() => {
    if (screen === "all") {
      return value?.push
    } else {
      return (value?.[screen] as ColValue)?.push
    }
  }, [screen, value])

  const handleSpanChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, span: val || undefined })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, span: val || undefined } })
    }
  }, [onChange, screen, value])

  const handleFlexChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value || undefined
    if (screen === "all") {
      onChange?.({ ...value, flex: val })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, flex: val } })
    }
  }, [onChange, screen, value])

  const handleOffsetChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, offset: val || undefined })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, offset: val || undefined } })
    }
  }, [onChange, screen, value])

  const handleOrderChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, order: val || undefined })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, order: val || undefined } })
    }
  }, [onChange, screen, value])

  const handlePullChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, pull: val || undefined })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, pull: val || undefined } })
    }
  }, [onChange, screen, value])

  const handlePushChange = useCallback((val: number | null) => {
    if (screen === "all") {
      onChange?.({ ...value, push: val || undefined })
    } else {
      onChange?.({ ...value, [screen]: { ...value?.[screen] as ColValue, push: val || undefined } })
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
            <Form.Item label={subTitles?.span} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <InputNumber style={{ width: "100%" }} value={spanValue} max={24} onChange={handleSpanChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.flex} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <Input style={{ width: "100%" }}  value={flexValue} onChange={handleFlexChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.offset} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <InputNumber style={{ width: "100%" }}  value={offsetValue} onChange={handleOffsetChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.order} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <InputNumber style={{ width: "100%" }}  value={orderValue} onChange={handleOrderChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.pull} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <InputNumber style={{ width: "100%" }}  value={pullValue} onChange={handlePullChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={subTitles?.push} labelAlign="right" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
              <InputNumber style={{ width: "100%" }}  value={pushValue} onChange={handlePushChange} />
            </Form.Item>
          </Col>
        </Row>
      </FoldExtra>
    </Fold>
  )
})


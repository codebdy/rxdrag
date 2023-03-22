import React from "react"
import { Checkbox, Col, Row } from "antd"
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { memo, useCallback } from "react"

export const CheckboxGroup = memo((
  props: {
    value?: string[],
    onChange?: (checkedValue?: CheckboxValueType[]) => void,
    options?: { label?: string, value: string }[]
  }
) => {
  const { value, onChange, options } = props;

  const handleChange = useCallback((values: CheckboxValueType[]) => {
    if (values.length === 0) {
      onChange?.(undefined)
    } else {
      onChange?.(values)
    }
  }, [onChange])

  return (
    <Checkbox.Group style={{ width: '100%' }} value={value} onChange={handleChange}>
      <Row>
        {
          options?.map(opt => {
            return <Col key={opt.value}>
              <Checkbox value={opt.value}>{opt.label}</Checkbox>
            </Col>
          })
        }
      </Row>
    </Checkbox.Group>
  )
})
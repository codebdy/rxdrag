import { Col, Radio, RadioChangeEvent } from "antd"
import { memo, useCallback } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"

export type ColInputProps = {
  title?: string
}

export const ColInput = memo((props: ColInputProps) => {
  const { title } = props
  const handleTypeChange = useCallback((e: RadioChangeEvent) => {
  }, [])
  return (
    <Fold className="rx-col-input">
      <FoldBase title={title}>
      </FoldBase>
      <FoldExtra >
        <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Radio.Group options={[
            { label: "All", value: 'all' },
            { label: "xs", value: 'xs' },
            { label: "sm", value: 'sm' },
            { label: "md", value: 'md' },
            { label: "lg", value: 'lg' },
            { label: "xl", value: 'xl' },
            { label: "xxl", value: 'xxl' },
          ]}
            optionType="button"
            onChange={handleTypeChange}
          />
        </Col>
        <Col span={8} style={{ display: "flex", alignItems: "center" }}>
        </Col>
      </FoldExtra>
    </Fold>
  )
})


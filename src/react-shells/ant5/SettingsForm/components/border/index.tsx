import { Col, Row } from "antd"
import { memo } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"

export interface IBorder {
  borderTop?: string,
  borderRight?: string,
  borderBottom?: string,
  borderLeft?: string,
}

const BorderIcon = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props
  return (
    <div className="rx-border-icon">{children}</div>
  )
})

export const BorderSetter = memo((props: {
  title?: string,
  value?: IBorder,
  onChange?: (value?: IBorder) => void
}) => {
  const { title, ...other } = props;


  return (
    <Fold>
      <FoldBase title={title}>

      </FoldBase>
      <FoldExtra>
        <Col span={8}>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderIcon>
                <div style={{ marginBottom: 8 }}>┳</div>
              </BorderIcon>
            </Col>
            <Col span={8}></Col>
            <Col span={8} style={{ marginTop: 4, }}><BorderIcon>┣</BorderIcon></Col>
            <Col span={8} style={{ marginTop: 4, marginBottom: 4 }}><BorderIcon>╋</BorderIcon></Col>
            <Col span={8} style={{ marginTop: 4, }}><BorderIcon>┫</BorderIcon></Col>
            <Col span={8}></Col>
            <Col span={8}><BorderIcon><div style={{ marginTop: 8 }}>┻</div></BorderIcon></Col>
            <Col span={8}></Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row>
            b
          </Row>
        </Col>
      </FoldExtra>
    </Fold>
  )
})

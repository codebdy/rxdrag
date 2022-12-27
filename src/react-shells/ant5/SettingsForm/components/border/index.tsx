import { Col, Row } from "antd"
import { memo, useCallback, useState } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"
import cls from "classnames"

export interface IBorder {
  borderTop?: string,
  borderRight?: string,
  borderBottom?: string,
  borderLeft?: string,
}

const BorderIcon = memo((
  props: {
    active?: boolean,
    children?: React.ReactNode,
    onClick?: () => void
  }
) => {
  const { active, onClick, children } = props
  return (
    <div className={cls("rx-border-icon", { active: active })} onClick={onClick}>{children}</div>
  )
})

export const BorderSetter = memo((props: {
  title?: string,
  value?: IBorder,
  onChange?: (value?: IBorder) => void
}) => {
  const { title, ...other } = props;
  const [selected, setSelected] = useState<"left" | "right" | "bottom" | "top">()

  const handleClickTop = useCallback(() => {
    setSelected("top")
  }, [])
  const handleClickRight = useCallback(() => {
    setSelected("right")
  }, [])
  const handleClickBottom = useCallback(() => {
    setSelected("bottom")
  }, [])
  const handleClickLeft = useCallback(() => {
    setSelected("left")
  }, [])

  const handleClickCenter = useCallback(() => {
    setSelected(undefined)
  }, [])
  return (
    <Fold>
      <FoldBase title={title}>

      </FoldBase>
      <FoldExtra>
        <Col span={8}>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderIcon active={selected === "top"} onClick={handleClickTop}>
                <div style={{ marginBottom: 8 }}>┳</div>
              </BorderIcon>
            </Col>
            <Col span={8}></Col>
            <Col span={8} style={{ marginTop: 4, }}>
              <BorderIcon active={selected === "left"} onClick={handleClickLeft}>┣</BorderIcon>
            </Col>
            <Col span={8} style={{ marginTop: 4, marginBottom: 4 }}>
              <BorderIcon active={!selected} onClick={handleClickCenter}>╋</BorderIcon>
            </Col>
            <Col span={8} style={{ marginTop: 4, }}>
              <BorderIcon active={selected === "right"} onClick={handleClickRight}>┫</BorderIcon>
            </Col>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderIcon active={selected === "bottom"} onClick={handleClickBottom}>
                <div style={{ marginTop: 8 }}>┻</div>
              </BorderIcon>
            </Col>
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

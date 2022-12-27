import { Col, Row, Select } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import "./style.less"
import cls from "classnames"
import { SizeInput } from "../SizeInput"
import { ColorInput } from "../ColorInput"
var border = require('css-border-property')

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
  const { title, value, onChange } = props;
  const [selected, setSelected] = useState<"left" | "right" | "bottom" | "top" | "center">("center")

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
    setSelected("center")
  }, [])

  const { color, style, width } = useMemo(() => {
    let str = (value as any)?.[selected] || ""
    if (selected === "center") {
      if (value?.borderLeft === value?.borderBottom && value?.borderBottom === value?.borderRight && value?.borderRight === value?.borderTop) {
        str = value?.borderLeft || ""
      }
    }
    let style = "none"
    let width = ""
    let color = ""
    const parsed = border.parse(str)
    for (const item of parsed || []) {
      if (item?.property === "border-style") {
        style = item?.value
      } else if(item?.property === "border-width"){
        width = item?.value
      } else if (item?.property === "border-color"){
        color = item?.value
      }
    }
    return { color: color, width: width, style: style }
  }, [selected, value])

  const handleStyleChange = useCallback((value: string) => {
    if (selected === "center") {
      onChange?.({
        borderTop: `${color} ${value} ${width}`,
        borderRight: `${color} ${value} ${width}`,
        borderBottom: `${color} ${value} ${width}`,
        borderLeft: `${color} ${value} ${width}`,
      })
    }
  }, [color, onChange, selected, width])

  const handleWidthChange = useCallback((value?: string | null) => {
    if (selected === "center") {
      onChange?.({
        borderTop: `${color} ${value || ""} ${style}`,
        borderRight: `${color} ${value || ""} ${style}`,
        borderBottom: `${color} ${value || ""} ${style}`,
        borderLeft: `${color} ${value || ""} ${style}`,
      })
    }
  }, [color, onChange, selected, style])

  const handleColorChange= useCallback((value?: string | null) => {
    if (selected === "center") {
      onChange?.({
        borderTop: `${width} ${value || ""} ${style}`,
        borderRight: `${width} ${value || ""} ${style}`,
        borderBottom: `${width} ${value || ""} ${style}`,
        borderLeft: `${width} ${value || ""} ${style}`,
      })
    }
  }, [onChange, selected, style, width])

  return (
    <Fold>
      <FoldBase title={title}>

      </FoldBase>
      <FoldExtra>
        <Col span={8} style={{ display: "flex", alignItems: "center" }}>
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
              <BorderIcon active={selected === "center"} onClick={handleClickCenter}>╋</BorderIcon>
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
            <Col span={24}>
              <Select
                defaultValue="none"
                style={{ width: "100%" }}
                onChange={handleStyleChange}
                value={style}
                options={[
                  {
                    value: "none",
                    label: "None"
                  },
                  {
                    value: 'solid',
                    label: <div style={{ width: "100%", borderBottom: "solid 1px", height: 12 }}></div>,
                  },
                  {
                    value: 'dashed',
                    label: <div style={{ width: "100%", borderBottom: "dashed 1px", height: 12 }}></div>,
                  },
                  {
                    value: 'dotted',
                    label: <div style={{ width: "100%", borderBottom: "dotted 1px", height: 12 }}></div>,
                  },
                ]}
              />
            </Col>
            <Col span={24} style={{ marginTop: 8 }}>
              <SizeInput exclude={["auto"]} value={width} onChange={handleWidthChange} />
            </Col>
            <Col span={24} style={{ marginTop: 8 }}>
              <ColorInput value ={color} onChange={handleColorChange} />
            </Col>
          </Row>
        </Col>
      </FoldExtra>
    </Fold>
  )
})

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
  const [selected, setSelected] = useState<"borderLeft" | "borderRight" | "borderBottom" | "borderTop" | "center">("center")

  const handleClickTop = useCallback(() => {
    setSelected("borderTop")
  }, [])
  const handleClickRight = useCallback(() => {
    setSelected("borderRight")
  }, [])
  const handleClickBottom = useCallback(() => {
    setSelected("borderBottom")
  }, [])
  const handleClickLeft = useCallback(() => {
    setSelected("borderLeft")
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
      } else if (item?.property === "border-width") {
        width = item?.value
      } else if (item?.property === "border-color") {
        color = item?.value
      }
    }
    return { color: color, width: width, style: style }
  }, [selected, value])

  const handleStyleChange = useCallback((val: string) => {
    const newValue = `${color} ${val} ${width}`
    if (selected === "center") {
      onChange?.({
        borderTop: newValue,
        borderRight: newValue,
        borderBottom: newValue,
        borderLeft: newValue,
      })
    } else {
      const allValue = {
        ...value,
        [selected]: newValue,
      }

      onChange?.(allValue)
    }
  }, [color, onChange, selected, value, width])

  const handleWidthChange = useCallback((val?: string | null) => {
    const newValue = `${color} ${val || ""} ${style}`
    if (selected === "center") {
      onChange?.({
        borderTop: newValue,
        borderRight: newValue,
        borderBottom: newValue,
        borderLeft: newValue,
      })
    } else {
      onChange?.({
        ...value,
        [selected]: newValue,
      })
    }
  }, [color, onChange, selected, style, value])

  const handleColorChange = useCallback((val?: string | null) => {
    if (selected === "center") {
      onChange?.({
        borderTop: `${width} ${val || ""} ${style}`,
        borderRight: `${width} ${val || ""} ${style}`,
        borderBottom: `${width} ${val || ""} ${style}`,
        borderLeft: `${width} ${val || ""} ${style}`,
      })
    } else {
      onChange?.({
        ...value,
        [selected]: `${width} ${val || ""} ${style}`,
      })
    }
  }, [onChange, selected, style, value, width])

  return (
    <Fold>
      <FoldBase title={title}>

      </FoldBase>
      <FoldExtra>
        <Col span={8} style={{ display: "flex", alignItems: "center" }}>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderIcon active={selected === "borderTop"} onClick={handleClickTop}>
                <div style={{ marginBottom: 8 }}>┳</div>
              </BorderIcon>
            </Col>
            <Col span={8}></Col>
            <Col span={8} style={{ marginTop: 4, }}>
              <BorderIcon active={selected === "borderLeft"} onClick={handleClickLeft}>┣</BorderIcon>
            </Col>
            <Col span={8} style={{ marginTop: 4, marginBottom: 4 }}>
              <BorderIcon active={selected === "center"} onClick={handleClickCenter}>╋</BorderIcon>
            </Col>
            <Col span={8} style={{ marginTop: 4, }}>
              <BorderIcon active={selected === "borderRight"} onClick={handleClickRight}>┫</BorderIcon>
            </Col>
            <Col span={8}></Col>
            <Col span={8}>
              <BorderIcon active={selected === "borderBottom"} onClick={handleClickBottom}>
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
              <ColorInput value={color} onChange={handleColorChange} />
            </Col>
          </Row>
        </Col>
      </FoldExtra>
    </Fold>
  )
})

import { CloseOutlined } from "@ant-design/icons"
import { useSettersTranslate } from "@rxdrag/react-core"
import { Button } from "antd"
import { memo, useCallback } from "react"
import { useToggleState } from "../hooks/useToggleState"
import styled from "styled-components"

const Contianer = styled.div`
  height: 40px;
  border-bottom: solid 1px;
  padding: 0 16px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-color: ${props => props.theme?.token?.colorBorder};
  color: ${props => props.theme?.token?.colorText};
`

export const PaneTitle = memo((
  props: {
    title?: string,
    button?: React.ReactNode,
  }
) => {
  const { title, button } = props;
  const { setToggled } = useToggleState()
  const t = useSettersTranslate()

  const handleCloseClick = useCallback(() => {
    setToggled(true)
  }, [setToggled])

  return (
    <Contianer
      className="rx-toggle-pane-title"
    >
      <div>{t(title || "")}</div>
      {
        button || <Button icon={<CloseOutlined />} shape="circle" type="text" onClick={handleCloseClick} />
      }
    </Contianer>
  )
})
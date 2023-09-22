import { GlobalToken } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { TokenItemInput } from "./TokenItemInput"
import { DownOutlined, RightOutlined } from "@ant-design/icons"

const ColorList = styled.div`
  display: flex;
  flex-flow: column;
`
const Title = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme?.token?.colorTextSecondary};
  align-items: center;
  cursor: pointer;
`

const Content = styled.div`
  width: 100%;
  height: 0px;
  overflow: hidden;
  padding-top: 8px;
  &.expand{
    height: auto;
  }
`

export const ThemeTokenSetter = memo((props: {
  value?: GlobalToken,
  onChange?: (value?: GlobalToken) => void
}) => {
  const { value, onChange } = props;
  const [expand, setExpand] = useState(false);

  const handleToggle = useCallback(() => {
    setExpand(exp => !exp)
  }, [])

  const handleChange = useCallback((val?: GlobalToken) => {
    onChange?.(val)
  }, [onChange])

  return (
    <ColorList>
      <Title onClick={handleToggle}>
        <span>
        </span>
        {
          expand ? <DownOutlined /> : <RightOutlined />
        }

      </Title>
      <Content className={expand ? "expand" : undefined}>
        <TokenItemInput name="colorPrimary" value={value} onChange={handleChange} />
        <TokenItemInput name="colorBgBase" value={value} onChange={handleChange} />
        <TokenItemInput name="colorBgContainer" value={value} onChange={handleChange} />
        <TokenItemInput name="colorText" value={value} onChange={handleChange} />
        <TokenItemInput name="colorTextSecondary" value={value} onChange={handleChange} />
        <TokenItemInput name="colorBorder" value={value} onChange={handleChange} />
        <TokenItemInput name="colorBorderSecondary" value={value} onChange={handleChange} />
      </Content>
    </ColorList>
  )
})
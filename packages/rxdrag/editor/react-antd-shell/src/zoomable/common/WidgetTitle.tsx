import { MinusOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";
import { CSSProperties, memo } from "react"
import styled from "styled-components";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  height: 40px;
  color: ${props => props.theme.token?.colorText};
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  user-select: none;
`

export const WidgetTitle = memo((
  props: {
    icon?: React.ReactNode,
    title?: React.ReactNode,
    onClose?: () => void,
    style?: CSSProperties,
    className?: string,
  }
) => {
  const { icon, title, onClose, ...rest } = props;
  return (
    <Title {...rest}>
      <Space>
        <span style={{ fontSize: 14 }}>
          {icon}
        </span>
        <span>
          {title}
        </span>
      </Space>
      <Button
        size="small"
        type="text"
        icon={<MinusOutlined />}
        onClick={onClose}
      />
    </Title>
  )
})
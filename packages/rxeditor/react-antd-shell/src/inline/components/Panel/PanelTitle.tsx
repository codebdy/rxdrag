import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames";
import { memo } from "react"
import styled from "styled-components"

const Title = styled.div`
  display: flex;
  padding: 8px 16px;
  padding-right: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme?.token?.colorBorder};
  color: ${props => props.theme?.token?.colorTextSecondary};
`

export const PanelTitle = memo((props: {
  className?: string,
  children?: React.ReactNode,
  onClose?: () => void,
}) => {
  const { className, children, onClose, ...rest } = props;
  return (
    <Title className={classNames("rx-widget-title", className)} {...rest}>
      <span>{children}</span>
      <Button
        type="text"
        size="small"
        icon={<CloseOutlined />}
        onClick={onClose}
      />
    </Title>
  )
})
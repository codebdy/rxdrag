import { Button, ButtonProps, Tooltip } from "antd"
import { memo, useMemo } from "react"
import styled from "styled-components"
import classNames from "classnames"

const StyledButton = styled(Button)`
  height: 42px;
  border-radius: 0;
  box-sizing: border-box;
  border-left: solid 3px transparent;
  border-right: solid 3px transparent;
  &.intermediate{
    border-left-color: ${props => props.theme?.token?.colorPrimary};
  }
`

export const NavButton = memo((props: ButtonProps & {
  title?: string,
  intermediate?: boolean,
  selected?: boolean,
}) => {
  const { title, intermediate, selected, className, ...rest } = props
  const newType = useMemo(() => {
    if (selected) {
      return "primary"
    } else if (intermediate) {
      return "link"
    }
    return "text"
  }, [intermediate, selected])
  return (
    <Tooltip title={title} placement="right">
      <StyledButton className={classNames(className, { intermediate })} block type={newType} {...rest} />
    </Tooltip>
  )
})
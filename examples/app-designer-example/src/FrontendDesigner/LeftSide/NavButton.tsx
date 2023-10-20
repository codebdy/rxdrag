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
  &.selected{
    border-left-color: ${props => props.theme?.token?.colorPrimary};
  }
`

export const NavButton = memo((props: ButtonProps & {
  title?: string,
  //intermediate?: boolean,
  selected?: boolean,
}) => {
  const { title, selected, className, ...rest } = props
  const newType = useMemo(() => {
    if (selected) {
      return "link"
    }
    return "text"
  }, [selected])
  return (
    <Tooltip title={title} placement="right">
      <StyledButton className={classNames(className, { selected })} block type={newType} {...rest} />
    </Tooltip>
  )
})
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { useStyles } from "react-shells/ant5/hooks/useStyles"
import "./style.less"
import cls from "classnames"

export enum ToggleType {
  left = "left",
  right = "right"
}

export const ToggleButton = (
  props: {
    toggleType?: ToggleType
    toggled?: boolean,
    onClick: () => void,
  }
) => {
  const { toggleType, toggled, onClick } = props
  const styles = useStyles((token) => ({
    borderColor: token.colorBorder,
    backgroundColor: token.colorBgBase,
    color: token.colorText,
  }))

  const rightIcon = toggleType === ToggleType.left ? <RightOutlined /> : <LeftOutlined />
  const lefIcon = toggleType !== ToggleType.left ? <RightOutlined /> : <LeftOutlined />
  const typeClass = toggleType === ToggleType.left ? "left-style" : "right-style"
  return (
    <div className={cls("toggle-button", typeClass)} style={styles} onClick={onClick}>
      {
        toggled
          ? rightIcon
          : lefIcon
      }
    </div>
  )
}
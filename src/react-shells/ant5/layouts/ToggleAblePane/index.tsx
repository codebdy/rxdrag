import React, { CSSProperties, memo, useCallback, useMemo, useState } from "react"
import { useStyles } from "react-shells/ant5/hooks/useStyles";
import { Box } from "../../components/Box"
import { ToggleAblePaneContext } from "./context";
import "./style.less"
import { ToggleButton, ToggleType } from "./ToggleButton";

export const ToggleAblePane = memo((
  props: {
    toggleType?: ToggleType
    width?: number,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { toggleType = ToggleType.left, width = 260, children, style, ...other } = props;
  const [toggled, setToggled] = useState(false);

  const styles = useStyles((token) => ({
    borderRight: toggleType === ToggleType.left ? `solid 1px ${token.colorBorder}` : undefined,
    borderLeft: toggleType === ToggleType.right ? `solid 1px ${token.colorBorder}` : undefined,
  }))

  const handleToggle = useCallback(() => {
    setToggled((toggled) => !toggled)
  }, [])

  const params = useMemo(() => {
    return { toggled, setToggled }
  }, [toggled])

  return (
    <ToggleAblePaneContext.Provider value={params}>
      <Box className="rx-editor-left-pane" style={{ ...styles, ...style, width: toggled ? 0 : width }} {...other}>
        <Box className="pane-content">
          <Box className="pane-placeholder" style={{ width: width }}>
            {children}
          </Box>
        </Box>
        <ToggleButton toggleType={toggleType} toggled={toggled} onClick={handleToggle} />
      </Box >
    </ToggleAblePaneContext.Provider>
  )
})
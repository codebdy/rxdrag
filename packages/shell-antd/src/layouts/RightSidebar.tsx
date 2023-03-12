import React, { memo } from "react"
import { Box } from "../components/Box"

export const RightSidebar = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children, ...other } = props;
  return (
    <Box {...other}>
      {children}
    </Box>
  )
})
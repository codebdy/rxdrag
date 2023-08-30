import { SettingOutlined } from "@ant-design/icons"
import { memo } from "react"
import { LeftNavButton } from "../common/LeftNavButton"

export const ScreenDialog = memo(() => {
  return (
    <>
      <LeftNavButton icon={<SettingOutlined />} type="text" />
    </>
  )
})
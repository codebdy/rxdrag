import { memo } from "react"
import { Button, Space } from "antd"
import { LangButtons, SaveActions, ThemeButton } from "../../normal"
import { GithubFilled } from "@ant-design/icons"

export const ToolbarRightButttons = memo(() => {
  return (
    <Space>
      <ThemeButton />
      <LangButtons />
      <Button
        href="https://github.com/rxdrag/rxeditor"
        target="_blank"
        icon={<GithubFilled />}
      > Github</Button>
      <SaveActions />
    </Space>
  )
})
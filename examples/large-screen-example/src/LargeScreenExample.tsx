import { memo } from "react"
import { LangButtons, ThemeButton, ZoomableEditor } from "@rxdrag/react-antd-shell"
import { GithubFilled } from "@ant-design/icons"
import { Space, Button } from "antd"
import { SaveButton } from "./SaveButton"
import { Logo, MenuButton } from "example-common"

export const LargeScreenExample = memo(() => {
  return (
    <ZoomableEditor
      topBar={
        <>
          <Space>
            <Logo title="大屏" />
            设备 
            模型
            编排
          </Space>
          <Space>
            <ThemeButton />
            <LangButtons />
            <Button
              href="https://github.com/rxdrag/rxeditor"
              target="_blank"
              icon={<GithubFilled />}
            > Github</Button>
            <SaveButton />
            <MenuButton />
          </Space>
        </>
      }
    />
  )
})
import { DefaultToolbar, Toolkits } from "@rxdrag/react-antd-shell-inline"
import { ConfigProvider, theme } from "antd"
import { memo } from "react"

export const PageEditor = memo((
  props: {
    design?: boolean
  }
) => {
  const { design } = props
  return (
    <>
      Page 内容
      {design && <ConfigProvider
        theme={{ algorithm: theme.darkAlgorithm }}
      >
        <Toolkits
          toolbar={<DefaultToolbar />}
        />
      </ConfigProvider>
      }
    </>
  )
})
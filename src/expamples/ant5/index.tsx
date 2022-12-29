import { GithubFilled } from "@ant-design/icons"
import { Button, Space } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import { Antd5Editor } from "react-shells/ant5"
import { componentsIcon, historyIcon, outlineIcon } from "react-shells/ant5/icons"
import { HistoryWidget } from "react-shells/ant5/widgets/HistoryWidget"
import { LangButtons } from "react-shells/ant5/widgets/LangButtons"
import { LeftNavWidget } from "react-shells/ant5/widgets/LeftNavWidget"
import { Logo } from "react-shells/ant5/widgets/Logo"
import { OutlineWidget } from "react-shells/ant5/widgets/OutlineWidget"
import { ThemeButton } from "react-shells/ant5/widgets/ThemeButton"
import { toolsLocales } from "./locales"
import { ResourceWidget } from "./ResourceWidget"
import { SaveButton } from "./widgets/SaveButton"

export enum LeftNavType {
  compoents = "components",
  outline = "outline",
  history = "history",
}

export const Antd5Example = memo(() => {
  const [activedKey, setActivedKey] = useState<LeftNavType>(LeftNavType.compoents)
  const handleActive = useCallback((key: string) => {
    setActivedKey(key as LeftNavType)
  }, [])

  const schemas = useMemo(() => {
    return {
      componentName: "Root",
      "children": [
        {
          "componentName": "TwoColumnLayout",
          "props": {},
          "slots": {
            "header": {
              "componentName": "Layout.Header",
              "props": {
                "style": {
                  "display": "flex",
                  "justifyContent": "space-between",
                  "alignItems": "center"
                }
              },
              "slots": {},
              "children": [
                {
                  "componentName": "Avatar",
                  "props": {},
                  "slots": {},
                  "children": []
                }
              ]
            },
            "sider": {
              "componentName": "Layout.Sider",
              "props": {},
              "slots": {},
              "children": [
                {
                  "componentName": "Logo",
                  "slots": {},
                  "children": []
                },
                {
                  "componentName": "Menu",
                  "slots": {},
                  "children": []
                }
              ]
            },
            "content": {
              "componentName": "Layout.Content",
              "props": {},
              "slots": {},
              "children": [
                {
                  "componentName": "HeroTip",
                  "props": {
                    "style": {
                      "marginTop": "16px",
                      "marginRight": "16px",
                      "marginBottom": "16px",
                      "marginLeft": "16px"
                    }
                  },
                  "slots": {},
                  "children": []
                },
                {
                  "componentName": "Row",
                  "props": {
                    "style": {
                      "marginTop": "16px",
                      "marginRight": "16px",
                      "marginBottom": "16px",
                      "marginLeft": "16px"
                    }
                  },
                  "slots": {},
                  "children": [
                    {
                      "componentName": "Col",
                      "props": {
                        "span": 16,
                        "style": {}
                      },
                      "slots": {},
                      "children": []
                    },
                    {
                      "componentName": "Col",
                      "props": {
                        "span": 8,
                        "style": {}
                      },
                      "slots": {},
                      "children": []
                    }
                  ]
                }
              ]
            },
            "footer": {
              "componentName": "Layout.Footer",
              "props": {},
              "slots": {},
              "children": []
            }
          },
          "children": []
        }
      ],
    }
  }, [])

  return (
    <Antd5Editor
      schemas={schemas}
      navPanel={
        <>
          {
            //ResourceWidget 内部会注册组件，要防止多次渲染
            <ResourceWidget display={activedKey === LeftNavType.compoents} />
          }
          <HistoryWidget display={activedKey === LeftNavType.history} />
          <OutlineWidget display={activedKey === LeftNavType.outline} />
        </>
      }
      topBar={
        <>
          <Logo />
          <Space>
            <ThemeButton />
            <LangButtons />
            <Button
              href="https://github.com/rxdrag/rxeditor"
              target="_blank"
              icon={<GithubFilled />}
            > Github</Button>
            <SaveButton />
          </Space>
        </>
      }
      locales={toolsLocales}
      leftNav={
        <LeftNavWidget
          //showTitle
          defaultActivedKey="components"
          items={[
            {
              key: LeftNavType.compoents,
              title: "components",
              icon: componentsIcon
            },
            {
              key: LeftNavType.outline,
              title: "outline",
              icon: outlineIcon
            },
            {
              key: LeftNavType.history,
              title: "history",
              icon: historyIcon
            },
          ]}
          onActive={handleActive}
        />
      }
    />
  )
})
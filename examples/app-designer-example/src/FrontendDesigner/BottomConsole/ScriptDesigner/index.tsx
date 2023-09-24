import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Space, Tooltip } from "antd"
import { CloseOutlined, CodeOutlined, FunctionOutlined } from "@ant-design/icons"
import { Funcs } from "./Funcs"
import { Scripts } from "./Scripts"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { Title } from "../common/Title"

const Content = styled.div`
  flex: 1;
`

enum NavType {
  flows = "flows",
  fxes = "fxes",
}

export const ScriptDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)


  const handleToggleFlows = useCallback(() => {
    setNavType(type => type === NavType.flows ? null : NavType.flows)
  }, [])

  const handleToggleFxes = useCallback(() => {
    setNavType(type => type === NavType.fxes ? null : NavType.fxes)
  }, [])

  const handleCloseLeft = useCallback(() => {
    setNavType(null)
  }, [])

  return (
    <Container>
      <LeftNav>
        <Space direction="vertical">
          <Tooltip title="执行脚本" placement="right">
            <Button
              type={navType === NavType.flows ? "link" : "text"}
              icon={<CodeOutlined />}
              onClick={handleToggleFlows}
            />
          </Tooltip>
          <Tooltip title="通用代码" placement="right">
            <Button
              type={navType === NavType.fxes ? "link" : "text"}
              icon={<FunctionOutlined />}
              onClick={handleToggleFxes}
            />
          </Tooltip>
        </Space>
      </LeftNav>
      {
        navType && <LeftColumn
          width={200}
          maxWidth={500}
          minWidth={160}
        >
          <Title>
            {
              NavType.flows === navType &&
              <span>
                执行脚本
              </span>
            }
            {
              NavType.fxes === navType &&
              <span>
                通用代码
              </span>
            }
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={handleCloseLeft}
            />
          </Title>
          {
            navType === NavType.flows &&
            <Scripts />
          }
          {
            navType === NavType.fxes &&
            <Funcs />
          }
        </LeftColumn>
      }
      <Content />
    </Container>
  )
})
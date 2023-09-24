import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Space, Tooltip } from "antd"
import { FunctionOutlined, ControlOutlined, CloseOutlined } from "@ant-design/icons"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { Title } from "../common/Title"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { activityMaterialCategories, activityMaterialLocales } from "../minion-materials"

const Content = styled.div`
  flex: 1;
  position: relative;
`


enum NavType {
  flows = "flows",
  fxes = "fxes",
}

export const FlowDesigner = memo(() => {
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
          <Tooltip title="编排" placement="right">
            <Button
              type={navType === NavType.flows ? "link" : "text"}
              icon={<ControlOutlined />}
              onClick={handleToggleFlows}
            />
          </Tooltip>
          <Tooltip title="子编排" placement="right">
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
          width={260}
          maxWidth={500}
          minWidth={160}
        >
          <Title>
            {
              NavType.flows === navType &&
              <span>
                逻辑编排
              </span>
            }
            {
              NavType.fxes === navType &&
              <span>
                子编排
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
            <Flows />
          }
          {
            navType === NavType.fxes &&
            <FXes />
          }
        </LeftColumn>
      }
      <Content>
        <LogicFlowEditorAntd5
          materialCategories={activityMaterialCategories}
          locales={activityMaterialLocales}
          value={{
            nodes: [],
            lines: []
          }}
        />
      </Content>
    </Container>
  )
})
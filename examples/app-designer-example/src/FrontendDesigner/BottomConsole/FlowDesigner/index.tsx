import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Space, Tooltip } from "antd"
import { FunctionOutlined, ControlOutlined, CloseOutlined, AppstoreOutlined } from "@ant-design/icons"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { Title } from "../common/Title"
import { FlowToolbar, LogicFlowEditorAntd5, Toolbox } from "@rxdrag/logicflow-editor-antd5"
import { activityMaterialCategories, activityMaterialLocales } from "../minion-materials"
import { LogicFlowEditorScope } from "@rxdrag/minions-logicflow-editor"

const Content = styled.div`
  flex: 1;
  position: relative;
`


enum NavType {
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
}

const test = {
  nodes: [],
  lines: []
}

export const FlowDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)

  const handleToggleToolbox = useCallback(() => {
    setNavType(type => type === NavType.toolbox ? null : NavType.toolbox)
  }, [])

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
    <LogicFlowEditorScope>
      <Container>
        <LeftNav>
          <Space direction="vertical">
            <Tooltip title="元件箱" placement="right">
              <Button
                type={navType === NavType.toolbox ? "link" : "text"}
                icon={<AppstoreOutlined />}
                onClick={handleToggleToolbox}
              />
            </Tooltip>
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
                NavType.toolbox === navType &&
                <span>
                  元件
                </span>
              }
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
              navType === NavType.toolbox &&
              <Toolbox materialCategories={activityMaterialCategories} />
            }
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
            value={test}
            toolbox={false}
            toolbar={
              <FlowToolbar
                right={
                  <Button type="primary">保存</Button>
                }
              >
                添加用户
              </FlowToolbar>
            }
          />
        </Content>
      </Container>
    </LogicFlowEditorScope>
  )
})
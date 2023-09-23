import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Space } from "antd"
import { AppstoreOutlined, FunctionOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { ResizableColumn } from "@rxdrag/react-antd-shell"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { PropertyPanel } from "./PropertyPanel"

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const LeftNav = styled.div`
  display: flex;
  flex-flow: column;
  width: 32px;
  padding: 8px;
  align-items: center;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

const LeftColumn = styled(ResizableColumn)`
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

const Content = styled.div`
  flex: 1;
`

enum NavType {
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
}

export const FlowDesigner = memo((
  props: {
    showPropertyPanel?: boolean,
  }
) => {
  const { showPropertyPanel } = props;
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

  return (
    <Container>
      <LeftNav>
        <Space direction="vertical">
          <Button
            type={navType === NavType.toolbox ? "link" : "text"}
            icon={<AppstoreOutlined />}
            onClick={handleToggleToolbox}
          />
          <Button
            type={navType === NavType.flows ? "link" : "text"}
            icon={<UnorderedListOutlined />}
            onClick={handleToggleFlows}
          />
          <Button
            type={navType === NavType.fxes ? "link" : "text"}
            icon={<FunctionOutlined />}
            onClick={handleToggleFxes}
          />
        </Space>
      </LeftNav>
      {
        navType && <LeftColumn
          width={200}
          maxWidth={500}
          minWidth={160}
        >
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
      <Content />
      {
        showPropertyPanel && <PropertyPanel />
      }

    </Container>
  )
})
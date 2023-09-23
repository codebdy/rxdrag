import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Button, Collapse, CollapseProps, Space } from "antd"
import { AppstoreOutlined, FunctionOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons"
import { ResizableColumn } from "@rxdrag/react-antd-shell"

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

const PropertyBox = styled(ResizableColumn)`
    border-left: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

const HeaderLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const text = `
  A dog is a typ
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <HeaderLabel>
      <span>用户管理</span>
      <Button size="small" type="text" icon={<PlusOutlined />} />
    </HeaderLabel>,
    children: <Space direction="vertical">
      <Button type="default">
        添加用户
      </Button>
      <Button type="text">
        编辑用户
      </Button>
      <Button type="text">
        删除用户
      </Button>
    </Space>,
  },
  {
    key: '2',
    label: '设备端级',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: '应用级',
    children: <p>{text}</p>,
  },
];

enum NavType {
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
}

export const FlowDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

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
      <LeftColumn
        width={200}
        maxWidth={500}
        minWidth={160}
      >
        <Collapse ghost items={items} defaultActiveKey={['1']} onChange={onChange} />
      </LeftColumn>
      <Content />
      <PropertyBox
        right
        width={260}
        maxWidth={500}
        minWidth={160}
      >

      </PropertyBox>
    </Container>
  )
})
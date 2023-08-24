import React, { useCallback, useState } from 'react';
import {
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Space } from 'antd';
import styled from 'styled-components';
import { Logo, MenuButton, controllerDefines, materials, minionsLocales, minionsMaterialCategories } from 'example-common';
import { EditorScope } from '@rxdrag/react-antd-shell-inline';
import { PageEditor } from './page';
import { INodeSchema } from "@rxdrag/schema"
import { ControllerSetter } from "@rxdrag/react-antd-shell"

const { Header, Sider, Content } = Layout;

const StyleLayout = styled(Layout)`
  height: 100vh;
`

const LogoContainer = styled.div`
  display: flex;
  padding: 16px;
  color: #fff;

`

const StyledHeader = styled(Header)`
  padding:0;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InlineEditorExample: React.FC = () => {
  const [design, setDesign] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleToggleDesign = useCallback(() => {
    setDesign(design => !design)
  }, [])

  const handleFinished = useCallback((schema: INodeSchema) => {
    console.log("====>finished", schema)
    setDesign(false)
  }, [])

  return (
    <EditorScope
      themeMode='dark'
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}
      materials={materials}
      setters={{ ControllerSetter }}
    >
      <StyleLayout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoContainer>
            <Space>
              <Logo title="Inline" style={{ color: "#fff" }} />
            </Space>
          </LogoContainer>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout>
          <StyledHeader style={{ background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Space>
              <Button type='text' icon={<EditOutlined />} onClick={handleToggleDesign} />
              <MenuButton />
            </Space>
          </StyledHeader>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <PageEditor design={design} onFinished={handleFinished} />
          </Content>
        </Layout>
      </StyleLayout>
    </EditorScope>
  );
};

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Space, ConfigProvider } from 'antd';
import { Logo } from './Logo';
import styled from 'styled-components';
import { MenuButton } from 'example-common';
import { EditorScope, Toolkits } from '@rxdrag/react-antd-shell-inline';

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <EditorScope>
      <StyleLayout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <LogoContainer>
            <Space>
              <Logo />
              <span>
                内联编辑器
              </span>
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
            Content
            <ConfigProvider
              theme={{ algorithm: theme.darkAlgorithm }}
            >
              <Toolkits />
            </ConfigProvider>
          </Content>
        </Layout>
      </StyleLayout>
    </EditorScope>
  );
};

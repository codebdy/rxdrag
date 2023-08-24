import React, { useState } from 'react';
import {
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Space, ConfigProvider } from 'antd';
import styled from 'styled-components';
import { Logo, MenuButton } from 'example-common';
import { EditorScope, Toolkits } from '@rxdrag/react-antd-shell-inline';
import { PageEditor } from './page';

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
              <Button type='text' icon={<EditOutlined />} />
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
            <PageEditor />
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

import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons"
import { Layout, Menu, theme } from "antd"
import React from "react"
import { forwardRef, memo, useState } from "react"
import "./style.less"
import { Breadcrumb } from 'antd';

const { Header, Sider, Content, Footer } = Layout
export interface ProLayoutProps {
  header?: React.ReactElement<typeof Header>
  footer?: React.ReactElement<typeof Footer>
  content?: React.ReactElement<typeof Content>
}

export const ProLayout = memo(forwardRef<HTMLDivElement, ProLayoutProps>((
  props, ref) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
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
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, position: "sticky", top: 0, }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            minHeight: 280,
            padding: 16,
          }}
        >
          <div style={{
            background: "url(/imgs/hero.png) center",
            padding: 16,
            color: "#fff",
            borderRadius: 4,
          }}>
            <div>Hi, 欢迎使用 Apper 低代码平台！</div>
            <div>
              轻松创建、部署、管理您的Mes应用，提升开发效率，降低业务成本。
              <BookOutlined />开启引导
            </div>
          </div>
          Content
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}))
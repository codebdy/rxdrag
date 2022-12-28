import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons"
import { Badge, Card, Col, ConfigProvider, Layout, Menu, Row, theme, Typography } from "antd"
import React from "react"
import { forwardRef, memo, useState } from "react"
import "./style.less"


const { Title, Text, Link } = Typography;
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
        <Header style={{ padding: 0, background: colorBgContainer, position: "sticky", top: 0, zIndex: 1 }}>
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
          <Row>
            <Col span={24}>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm
                }}
              >
                <div style={{
                  background: "url(/imgs/hero.png) center",
                  padding: "8px 24px 32px 24px",
                  color: "#fff",
                  borderRadius: 6,
                }}>
                  <Title level={4}>Hi, 欢迎使用 Apper 低代码平台！</Title>
                  <Text>
                    轻松创建、部署、管理您的Mes应用，提升开发效率，降低业务成本。
                    <BookOutlined /> <Link style={{ color: "#fff", textDecoration: "underline" }} href="#">开启引导</Link>
                  </Text>
                </div>
              </ConfigProvider>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={16}>
              <Card style={{ backgroundColor: colorBgContainer }}>
                <Row gutter={16}>
                  <Col span={6}>
                    订单总数
                  </Col>
                  <Col span={6}>
                    进行中
                  </Col>
                  <Col span={6}>
                    待发货
                  </Col>
                  <Col span={6}>
                    待收款
                  </Col>
                </Row>
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title={<Badge count={5}  color="grey" offset={[12, 7]}>待办事项</Badge>}
              >
                <Row gutter={16}>
                  <Col span={6}>
                    发起申请
                  </Col>
                  <Col span={6}>
                    我的待办
                  </Col>
                  <Col span={6}>
                    申请中
                  </Col>
                  <Col span={6}>
                    抄送给我
                  </Col>
                </Row>
              </Card>
              <Card style={{ backgroundColor: colorBgContainer, marginTop: 16 }} title={"最新客户"}>
              </Card>
              <Card style={{ backgroundColor: colorBgContainer, marginTop: 16 }} title={"动态"}>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ backgroundColor: colorBgContainer }}
                title="快速入口"
                extra={<SettingOutlined />}
              >
                <Row gutter={16}>
                  <Col>付款申请</Col>
                  <Col>采购申请</Col>
                  <Col>差旅申请</Col>
                  <Col>订舱申请</Col>
                  <Col>用章流程</Col>
                  <Col>客户商机</Col>
                  <Col>用车申请</Col>
                  <Col>请假申请</Col>
                  <Col>全部应用</Col>
                </Row>
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title="使用帮助"
              >
                其它帮助
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title="公告"
              >

              </Card>

              <div>
                更新日志 <br />
                反馈 <br />
                服务协议 <br />
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}))
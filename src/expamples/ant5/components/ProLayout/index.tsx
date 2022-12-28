import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined, BookOutlined, SettingOutlined, DollarCircleOutlined, ShoppingOutlined, CarOutlined, EllipsisOutlined, RocketOutlined, ScheduleOutlined, SoundOutlined, StarOutlined, GiftOutlined, LikeOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Avatar, Badge, Button, Card, Col, ConfigProvider, Divider, Layout, Menu, Row, Statistic, theme, Typography } from "antd"
import React from "react"
import { forwardRef, memo, useState } from "react"
import { Customers } from "./Customers"
import { Jobs } from "./Jobs"
import { Notices } from "./Notices"
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
                  <Col span={8}>
                    <Statistic title="订单总数" value={1128} prefix={<LikeOutlined />} />
                  </Col>
                  <Col span={5}>
                    <Statistic title="进行中" value={10} />
                  </Col>
                  <Col span={5}>
                    <Statistic title="待发货" value={3} />
                  </Col>
                  <Col span={5}>
                    <Statistic title="待收款" value={2} />
                  </Col>
                </Row>
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title={<Badge count={5} size={'small'} color="grey" offset={[8, 8]}>待办事项</Badge>}
                actions={[<Button type="text">查看全部 &gt;</Button>]}
              >
                <Jobs />
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title={"最新客户"}
                extra={<Button type="text" icon={<PlusOutlined />}>新建</Button>}
                actions={[<Button type="text">查看全部 &gt;</Button>]}
              >
                <Customers />
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title={"动态"}
                actions={[<Button >加载更多</Button>]}
              >
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{ backgroundColor: colorBgContainer }}
                title="快速入口"
                extra={<SettingOutlined />}
              >
                <Row gutter={16}>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,

                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: '#87d068' }} icon={<DollarCircleOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>付款申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<ShoppingOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>采购申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: 'lightblue' }} icon={<GiftOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>差旅申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: 'orange' }} icon={<RocketOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>订舱申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: 'lightred' }} icon={<StarOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>用章流程</Text>
                  </Col>

                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<CarOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>用车申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: 'lightblue' }} icon={<ScheduleOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>请假申请</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar style={{ backgroundColor: 'lightgreen' }} icon={<SoundOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>评价反馈</Text>
                  </Col>
                  <Col style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    padding: 16,
                    fontWeight: "bold",
                  }}>
                    <div style={{ paddingBottom: 8 }}>
                      <Avatar icon={<EllipsisOutlined />} />
                    </div>
                    <Text style={{ fontSize: 12, fontWeight: "bold", }}>全部应用</Text>
                  </Col>
                </Row>
              </Card>
              <img width={"100%"} style={{ marginTop: 16, borderRadius: 5 }} alt="ad" src="/imgs/ad.jpg" />
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title="使用帮助"
              >
                <div style={{ lineHeight: "30px", marginTop: -16 }}>
                  <div>
                    <Text>Apper 是什么?</Text>
                  </div>
                  <div>
                    <Text>如何开发一个优秀模板?</Text>
                  </div>
                  <div>
                    <Text>开发自定义组件需要注意的问题</Text>
                  </div>
                  <div>
                    <Text>低代码该如何做?</Text>
                  </div>
                  <div>
                    <Text>React的未来在哪里</Text>
                  </div>
                  <div>
                    <Text>Redux， 繁琐背后的优雅</Text>
                  </div>
                  <div>
                    <Text>查看全部</Text>
                  </div>
                </div>
                <Divider />
                <div>
                  <b>其它帮助</b>
                </div>
                <div style={{ marginLeft: '-16px', marginTop: 8 }}>
                  <div><Button type="link" icon={<BookOutlined />}>新手引导</Button></div>
                  <div><Button type="link" icon={<VideoCameraOutlined />}>视频演示</Button></div>
                  <div><Button type="link" icon={<QuestionCircleOutlined />}>产品文档</Button></div>
                </div>
              </Card>
              <Card
                style={{ backgroundColor: colorBgContainer, marginTop: 16 }}
                title="公告"
              >
                <Notices />
              </Card>

              <div style={{ marginTop: 16 }}>
                <p>
                  <Text >更新日志</Text>
                </p>
                <p>
                  <Text >反馈</Text>
                </p>
                <p>
                  <Text >服务协议</Text>
                </p>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer>Apper 低代码平台， 您的下一行未必是代码</Footer>
      </Layout>
    </Layout>
  )
}))
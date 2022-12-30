import { BookOutlined } from "@ant-design/icons";
import { ConfigProvider, theme, Typography } from "antd"
import { forwardRef, memo } from "react"

const { Title, Text, Link } = Typography;
export const HeroTip = memo(forwardRef<HTMLDivElement>((props: any, ref) => {
  const { style, ...other } = props
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}
    >
      <div
        ref={ref}
        style={{
          background: "url(/imgs/hero.png) center",
          padding: "8px 24px 32px 24px",
          color: "#fff",
          borderRadius: 6,
          ...style
        }}
        {...other}
      >
        <Title level={4}>Hi, 欢迎使用 Apper 低代码平台！</Title>
        <Text>
          轻松创建、部署、管理您的Mes应用，提升开发效率，降低业务成本。
          <BookOutlined /> <Link style={{ color: "#fff", textDecoration: "underline" }} href="#">开启引导</Link>
        </Text>
      </div>
    </ConfigProvider>
  )
}))
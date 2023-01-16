import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { memo } from "react"
import styled from "styled-components";

const { Text } = Typography;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
`

export const Members = memo(() => {
  return (
    <>
      <Title><Text type="secondary">事件</Text></Title>
      <Title>
        <Text type="secondary">方法</Text>
        <Button size="small" type="text" icon={<PlusOutlined />}></Button>
      </Title>
      <Title>
        <Text type="secondary">变量</Text>
        <Button size="small" type="text" icon={<PlusOutlined />}></Button>
      </Title>
    </>
  )
})
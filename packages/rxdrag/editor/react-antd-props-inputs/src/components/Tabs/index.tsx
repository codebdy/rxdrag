/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, memo, useMemo } from "react"
import { Tabs as AntdTabs } from 'antd';
import cls from "classnames"
import { useComponentSchema } from "@rxdrag/react-runner";
import { isArr } from "@rxdrag/shared";
import React from "react";
import styled from "styled-components";

export * from "./TabPanel"

const Container = styled.div`
  height: 100%;
  .ant-tabs-nav-list{
    margin: 0 16px;
  }
  .rx-tab-panel{
    padding: 0 16px;
    height: 100%;
    display: flex;
    flex-flow: column;
  }
  .ant-tabs{
    height: 100%;
    .ant-tabs-content-holder{
      overflow: auto;
    }
    .ant-tabs-content{
      height: 100%;
    }
    .ant-tabs-tabpane{
      height: 100%;
    }
  }
`

export const Tabs = memo(forwardRef<HTMLDivElement>((
  props: {
    className?: string,
    children?: React.ReactNode
  },
  ref
) => {
  const { children, className, ...other } = props
  const schema = useComponentSchema()
  const items = useMemo(() => {
    if (isArr(children)) {
      return children.map(((child, index) => {
        const childSchema = schema?.children?.[index]
        const key = childSchema?.props?.title as any + index
        return {
          label: childSchema?.props?.title,
          key: childSchema?.props?.id || key,
          children: child,
        }
      }))
    }
  }, [children, schema?.children])
  return (
    <Container ref={ref} className={cls("rx-tabs", className)} {...other}>
      <AntdTabs
        items={items as any}
      ></AntdTabs>
    </Container>
  )
}))
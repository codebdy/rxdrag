/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, memo, useMemo } from "react"
import { Tabs as AntdTabs } from 'antd';
import cls from "classnames"
import { useComponentSchema } from "@rxdrag/react-runner";
import { isArr } from "@rxdrag/shared";
import React from "react";
import styled from "styled-components";
import { useCurrentNode, useGetNode } from "@rxdrag/react-core";

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
    children?: React.ReactNode,
    fieldContainer?: string[] | string
  },
  ref
) => {
  const { children, className, fieldContainer = "FormItem", ...other } = props
  const schema = useComponentSchema()
  const node = useCurrentNode()
  const getNode = useGetNode()
  const items = useMemo(() => {
    if (isArr(children)) {
      return schema?.children?.map(((childSchema, index) => {
        const child = children?.[index]
        return {
          label: childSchema?.props?.title,
          key: childSchema?.props?.key || index,
          children: child,
          isField: childSchema.props?.isField,
        }
      })).filter(childSchema => {//先映射，最后过滤，要不然会出现child不匹配的问题
        //确定是否需要显示Field tab页
        const parent = getNode(node?.parentId)
        if (childSchema?.isField) {
          if (fieldContainer === parent?.meta.componentName) {
            return false
          } else if (isArr(fieldContainer)) {
            if (fieldContainer.find(con => con === parent?.meta.componentName)) {
              return false
            }
          }
        }
        return true
      })
    }
  }, [children, fieldContainer, getNode, node?.parentId, schema?.children])
  return (
    <Container ref={ref} className={cls("rx-tabs", className)} {...other}>
      <AntdTabs
        items={items as any}
      ></AntdTabs>
    </Container>
  )
}))
import { memo, useCallback } from "react";
import { ExpressionGroupType, ExpressionNodeType, IExpression, IExpressionGroup, IExpressionNode } from "../../../../activities/common/interfaces";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import styled from "styled-components";
import { AddMenu } from "./AddMenu";
import { ExpressionChild } from "./ExpressionChild";
import { ExpressionChildren } from "./ExpressionChildren";
import { createId } from "@rxdrag/shared";

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

export const ExpressionTreeInput = memo((
  props: {
    entityId: string,
    value?: (IExpression | IExpressionGroup)[],
    onChange?: (value?: (IExpression | IExpressionGroup)[]) => void
  }
) => {
  const { entityId, value, onChange } = props
  const t = useTranslate()

  const handleAddExp = useCallback(() => {
    onChange?.([
      ...value || [],
      {
        id: createId(),
        nodeType: ExpressionNodeType.Expression
      }
    ])
  }, [onChange, value])

  const handleAddGroup = useCallback((groupType: ExpressionGroupType) => {
    const newNode: IExpressionGroup = {
      id: createId(),
      nodeType: ExpressionNodeType.Group,
      groupType: groupType,
      children: [
        {
          id: createId(),
          nodeType: ExpressionNodeType.Expression
        } as IExpression
      ]
    }

    onChange?.([
      ...value || [],
      newNode
    ])
  }, [onChange, value])

  const handleAddExpAfter = useCallback((index: number) => {
    const newNode: IExpression = {
      id: createId(),
      nodeType: ExpressionNodeType.Expression
    }
    const newValue = [...value || []]
    newValue.splice(index + 1, 0, newNode)
    onChange?.(newValue)
  }, [onChange, value])

  const handleAddGroupAfter = useCallback((index: number, groupType: ExpressionGroupType) => {
    const newNode: IExpressionGroup = {
      id: createId(),
      nodeType: ExpressionNodeType.Group,
      groupType,
      children: [
        {
          id: createId(),
          nodeType: ExpressionNodeType.Expression
        }
      ]
    }
    const newValue = [...value || []]
    newValue.splice(index + 1, 0, newNode)
    onChange?.(newValue)
  }, [onChange, value])

  const handleRemove = useCallback((nodeId: string) => {
    onChange?.(value?.filter((child) => child.id !== nodeId))
  }, [onChange, value])

  const handleChildChange = useCallback((node: IExpressionNode | IExpressionGroup) => {
    onChange?.(value?.map(child => child.id === node.id ? node : child))
  }, [onChange, value])

  return (
    <Container>
      <ExpressionChildren className="expression-children">
        {
          value?.map((child, index) => {
            return (
              <ExpressionChild
                key={child.id}
                entityId = {entityId}
                child={child}
                index={index}
                onAddExpAffter={handleAddExpAfter}
                onExpressionChange={handleChildChange}
                onRemove={handleRemove}
                onGroupChange={handleChildChange}
                onAddGroupAffter={handleAddGroupAfter}
              />
            )
          })
        }
      </ExpressionChildren>
      <AddMenu
        onAddExpression={handleAddExp}
        onAddGroup={handleAddGroup}
      >
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          block
        >
          {t("add")}
        </Button>
      </AddMenu>
    </Container>
  )
})
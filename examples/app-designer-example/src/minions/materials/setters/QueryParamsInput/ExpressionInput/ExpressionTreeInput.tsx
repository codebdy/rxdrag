import { memo, useCallback } from "react";
import { ExpressionGroupType, ExpressionNodeType, IExpression, IExpressionGroup } from "../../../../activities/common/interfaces";
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
    value?: (IExpression | IExpressionGroup)[],
    onChange?: (value?: (IExpression | IExpressionGroup)[]) => void
  }
) => {
  const { value, onChange } = props
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

  return (
    <Container>
      <ExpressionChildren className="expression-children">
        {
          value?.map((child, index) => {
            return (
              <ExpressionChild
                key={child.id}
                child={child}
                index={index}
              // onAddExpAffter={handleAddExpAfter}
              // onExpressionChange={handleExpressionChange}
              // onRemove={handleRemoveChild}
              // onGroupChange={handleChildChange}
              // onAddGroupAffter={handleAddGroupAfter}
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
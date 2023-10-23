import { memo } from "react";
import { ExpressionGroup } from "./ExpressionGroup";
import { IExpression, IExpressionGroup } from "../../../../activities/common/interfaces";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import styled from "styled-components";
import { AddMenu } from "./AddMenu";
import { ExpressionChild } from "./ExpressionChild";
import { ExpressionChildren } from "./ExpressionChildren";
import { Item } from "./ExpressionItem";

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
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        block
      >
        {t("add")}
      </Button>
    </Container>
  )
})
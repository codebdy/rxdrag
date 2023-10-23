import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { memo, useMemo } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ExpressionGroupType, ExpressionNodeType } from "../../../../activities/common/interfaces";

export const AddMenu = memo((
  props: {
    onOpenChange?: (open: boolean) => void,
    onAddExpression: () => void,
    onAddGroup: (groupType: ExpressionGroupType) => void,
    children?: React.ReactNode,
  }
) => {
  const { onOpenChange, onAddExpression, onAddGroup, children } = props;
  const t = useTranslate();
  const items: MenuProps['items'] = useMemo(() => [
    {
      label: t("addExpression"),
      key: ExpressionNodeType.Expression,
      onClick: onAddExpression,
    },
    {
      label: t("addAndGroup"),
      key: ExpressionGroupType.And,
      onClick: () => onAddGroup(ExpressionGroupType.And)
    },
    {
      label: t("addOrGroup"),
      key: ExpressionGroupType.Or,
      onClick: () => onAddGroup(ExpressionGroupType.Or)
    },
  ], [onAddExpression, onAddGroup, t]);

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dropdown>
  )
})
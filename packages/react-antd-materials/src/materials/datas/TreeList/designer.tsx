import { PopupType, TreeListContent, TreeListProps, TreeListShell, TreeListTitle } from "@rxdrag/react-antd-components"
import { useComponentTranslate } from "@rxdrag/react-core";
import { useLocalesManager, useTranslate } from "@rxdrag/react-locales";
import { Button } from "antd";
import classNames from "classnames";
import React, { ForwardedRef, forwardRef } from "react"

export const TreeListDesigner = forwardRef((
  props: TreeListProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { title,
    onSelect,
    readOnly,
    loading,
    dataSource,
    popupType = PopupType.popover,
    idKey = "id",
    labelKey = "title",
    bordered,
    formLayout
  } = props;

  const t = useTranslate("components.TreeList")
  const l = useLocalesManager()
  console.log("====>useLocalesManager", l)
  return (<TreeListShell ref={ref} className={classNames("tree-editor-shell", { bordered })}>
    <TreeListTitle className="tree-title">
      <span>{title}</span>
      {
        !readOnly && <Button />
      }
    </TreeListTitle>
    <TreeListContent>
      <Button type="dashed" block>
        {t("openPopup")}
      </Button>
    </TreeListContent>
  </TreeListShell>)
})
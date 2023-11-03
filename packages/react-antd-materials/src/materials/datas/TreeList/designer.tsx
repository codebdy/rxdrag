import { PlusOutlined } from "@ant-design/icons";
import { PopupType, TreeListContent, TreeListItemLabel, TreeListProps, TreeListShell, TreeListTitle } from "@rxdrag/react-antd-components"
import { useTranslate } from "@rxdrag/react-locales";
import { Button } from "antd";
import Tree, { DataNode } from "antd/es/tree";
import classNames from "classnames";
import React, { ForwardedRef, forwardRef, useMemo } from "react"

const { DirectoryTree } = Tree;

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

  const treeData: DataNode[] = useMemo(() => [
    {
      key: "000",
      title: <TreeListItemLabel
        node={{ id: "000", label: t('level1Node') }}
        labelKey={"label"}
        idKey={"id"}
      />,
      selectable: false,
      children: [
        {
          title:  <TreeListItemLabel
          node={{ id: "000-1", label: t('level2Node') }}
          labelKey={"label"}
          idKey={"id"}
        />,
          key: '000-1',
          isLeaf: true
        },
      ],
    },
  ], [t]);

  return (<TreeListShell ref={ref} className={classNames("tree-editor-shell", { bordered })}>
    <TreeListTitle className="tree-title">
      <span>{title}</span>
      {
        !readOnly && <Button size="small" type="text" icon={<PlusOutlined />} />
      }
    </TreeListTitle>
    <TreeListContent>
      <DirectoryTree
        showIcon={false}
        multiple={false}
        defaultExpandAll={true}
        treeData={treeData || []}
      />
      <Button type="dashed" block>
        {t("openPopup")}
      </Button>
    </TreeListContent>
  </TreeListShell>)
})
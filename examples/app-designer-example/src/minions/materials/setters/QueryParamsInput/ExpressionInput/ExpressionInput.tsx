import { Input, Space, TreeSelect, TreeSelectProps } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { OperatorSelect } from "./OperatorSelect"
import type { ExpressionInputProps } from "./ExpressionInputProps"
import { DefaultOptionType } from "antd/es/select"
import { useEnitity } from "../../../../../FrontendDesigner/hooks/useEnitity"
import { useTranslate } from "@rxdrag/react-locales"
import { useGetEntity } from "../../../../../FrontendDesigner/hooks/useGetEntity"
import { EntityMeta } from "../../../../../FrontendDesigner/ModuleUiDesigner/interfaces/EntityMeta"

export const ExpressionInput = memo((
  props: ExpressionInputProps
) => {
  const { entityId } = props;
  const [value, setValue] = useState<string>();
  const entity = useEnitity(entityId)
  const getEntity = useGetEntity()
  const t = useTranslate()
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

  const getEntityNodes = useCallback((entity?: EntityMeta, pId?: string) => {
    return [
      ...entity?.attributes?.map((attr) => {
        const id = pId ? (pId + "." + attr.name) : attr.name
        return {
          id: id,
          pId,
          value: id,
          title: attr.label || attr.name || attr.uuid,
          isLeaf: true
        }
      }) || [],
      ...entity?.associations?.map((asso) => {
        const assoEntity = getEntity(asso.typeId)
        const id = pId ? (pId + "." + asso.name) : asso.name
        return {
          id: id,
          pId,
          value: id,
          title: asso.label || asso.name || asso.id + ":" + assoEntity?.label || assoEntity?.name,
          selectable: false,
          typeId: asso.typeId,
        }
      }) || [],
    ]
  }, [getEntity])

  useEffect(() => {
    setTreeData(getEntityNodes(entity))
  }, [entity, getEntityNodes])

  const onLoadData: TreeSelectProps['loadData'] = (arg) =>
    new Promise((resolve) => {
      const typeEntity = getEntity(arg.typeId)
      setTreeData(
        treeData.concat(getEntityNodes(typeEntity, arg.id))
      );
      resolve(undefined);
    });

  const onChange = (newValue: string) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <Space>
      <div>
        <TreeSelect
          allowClear
          treeDataSimpleMode
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ overflow: 'auto', width: 500 }}
          placeholder={t("pleaseSelect")}
          onChange={onChange}
          loadData={onLoadData}
          treeData={treeData}
        />
      </div>
      <OperatorSelect />
      <Input />
    </Space>
  )
})
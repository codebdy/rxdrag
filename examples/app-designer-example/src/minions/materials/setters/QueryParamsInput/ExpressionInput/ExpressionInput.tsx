import { Input, Space, TreeSelect, TreeSelectProps } from "antd"
import { memo, useEffect, useState } from "react"
import { OperatorSelect } from "./OperatorSelect"
import type { ExpressionInputProps } from "./ExpressionInputProps"
import { DefaultOptionType } from "antd/es/select"
import { useEnitity } from "../../../../../FrontendDesigner/hooks/useEnitity"
import { useTranslate } from "@rxdrag/react-locales"
import { useGetEntity } from "../../../../../FrontendDesigner/hooks/useGetEntity"

export const ExpressionInput = memo((
  props: ExpressionInputProps
) => {
  const { entityId } = props;
  const [value, setValue] = useState<string>();
  const entity = useEnitity(entityId)
  const getEntity = useGetEntity()
  const t = useTranslate()
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

  useEffect(() => {
    setTreeData([
      ...entity?.attributes?.map((attr) => {
        return {
          id: attr.uuid,
          value: attr.uuid,
          title: attr.label || attr.name || attr.uuid,
          isLeaf: true
        }
      }) || [],
      ...entity?.associations?.map((asso) => {
        return {
          id: asso.id,
          value: asso.id,
          title: asso.label || asso.name || asso.id,
          selectable: false,
          typeId: asso.typeId,
        }
      }) || [],
    ])
  }, [entity?.associations, entity?.attributes])

  const onLoadData: TreeSelectProps['loadData'] = (arg) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const entity = getEntity(arg.typeId)
        setTreeData(
          treeData.concat(entity?.attributes.map((attr) => {
            const id = arg.id + "." + attr.uuid
            return {
              id: id,
              pId: arg.id,
              value: id,
              title: attr.label || attr.name || attr.uuid,
              isLeaf: true
            }
          }) || []).concat(entity?.associations?.map((asso) => {
            const id = arg.id + "." + asso.id
            return {
              id: id,
              pId: arg.id,
              value: id,
              title: asso.label || asso.name || asso.id,
              selectable: false,
              typeId: asso.typeId,
            }
          }) || [])
        );
        resolve(undefined);
      }, 0);
    });

  const onChange = (newValue: string) => {
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
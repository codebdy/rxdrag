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
  const rootEntity = useEnitity(entityId)
  const getEntity = useGetEntity()
  const t = useTranslate()
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

  const getEntityNodes = useCallback((entity?: EntityMeta, pId?: string, pLabel?: string, parentTypeIds?: string[]) => {
    return [
      ...entity?.attributes?.map((attr) => {
        const id = pId ? (pId + "." + attr.name) : attr.name
        const label = attr.label || attr.name || attr.uuid
        return {
          id: id,
          pId,
          value: id,
          title: label,
          label: pLabel ? (pLabel + "." + label) : label,
          isLeaf: true
        }
      }) || [],
      ...entity?.associations?.filter((asso) => {
        if (parentTypeIds?.find(tid => tid === asso.typeId)) {
          return false
        }
        return true
      }).map((asso) => {
        const assoEntity = getEntity(asso.typeId)
        const id = pId ? (pId + "." + asso.name) : asso.name
        const label = (asso.label || asso.name || asso.id)
        return {
          id: id,
          pId,
          value: id,
          label: pLabel ? (pLabel + "." + label) : label,
          title: label + " : " + (assoEntity?.label || assoEntity?.name),
          selectable: false,
          typeId: asso.typeId,
          parentTypeIds: [...parentTypeIds || [], asso.typeId]
        }
      }) || [],
    ]
  }, [getEntity])

  useEffect(() => {
    if (rootEntity) {
      setTreeData(getEntityNodes(rootEntity, undefined, undefined, [rootEntity.uuid]))
    }

  }, [rootEntity, getEntityNodes])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoadData: TreeSelectProps['loadData'] = (arg: any) =>
    new Promise((resolve) => {
      const typeEntity = getEntity(arg.typeId)
      setTreeData(
        treeData.concat(getEntityNodes(typeEntity, arg.id, arg.label, arg.parentTypeIds))
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
          treeNodeLabelProp={"label"}
        />
      </div>
      <OperatorSelect />
      <Input />
    </Space>
  )
})
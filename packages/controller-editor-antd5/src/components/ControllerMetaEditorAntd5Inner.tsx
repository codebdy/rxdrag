import { memo, ReactNode, useCallback, useMemo, useState } from "react"
import styled from "styled-components";
import { ControllerContext } from "@rxdrag/minions-controller-editor";
import { ILogicMetas, LogicFlowEditor } from "@rxdrag/minions-logicflow-editor";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ActivityMaterialCategory, IActivityMaterial } from "@rxdrag/minions-schema";
import { ControllersContext } from "@rxdrag/react-runner";
import { Members } from "./Members";
import { PropertyBox } from "./PropertyBox";
import { Toolbox } from "./Toolbox";
import { useTransMaterialCategorys } from "../hooks/useTransMaterialCategorys";
import { useToken } from "antd/es/theme/internal";

const SytledContent = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  .ant-drawer-header{
    padding: 0 16px;
    min-height: 53px;
  }
  .ant-drawer-body{
    padding: 0;
    display: flex;
    flex-flow: column;
    overflow: hidden;
  };
`
const LeftArea = styled.div`
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 8px;
  overflow: auto;
`

export type ControllerMetaEditorAntd5InnerProps = {
  value: IControllerMeta,
  onChange?: (value?: IControllerMeta) => void,
  controllerMetas: IControllerMeta[],
  materialCategories: ActivityMaterialCategory<ReactNode>[],
}

export const ControllerMetaEditorAntd5Inner = memo((
  props: ControllerMetaEditorAntd5InnerProps
) => {
  const { value, onChange, controllerMetas, materialCategories } = props
  const [, token] = useToken();
  const categories = useTransMaterialCategorys(materialCategories);
  const getAllMaterial = useCallback(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...categories.map(category => category.materials))
  }, [categories])

  const [selected, setSelected] = useState<string>()
  const handleMemberChange = useCallback((meta?: IControllerMeta) => {
    onChange?.(meta)
    onChange?.(meta)
  }, [onChange])

  const logicFlowMeta = useMemo(() => {
    const logicflow = value?.reactions?.find(reaction => reaction.id === selected)
    if (logicflow) {
      return logicflow
    }

    return value?.events?.find(evt => evt.id === selected)
  }, [selected, value?.events, value?.reactions])

  const handleChange = useCallback((newMetas: ILogicMetas) => {
    const newValue = {
      ...value,
      reactions: value?.reactions?.map(reaction => reaction.id === selected ? { ...reaction, ...newMetas } : reaction),
      events: value?.events?.map(event => event.id === selected ? { ...event, ...newMetas } : event),
    }
    onChange?.(newValue)
  }, [onChange, selected, value])

  return (
    <ControllersContext.Provider value={controllerMetas}>
      <ControllerContext.Provider value={value}>
        <SytledContent id="reactions-editor-container">
          <LeftArea>
            <Members
              value={value}
              selected={selected}
              onSelect={setSelected}
              onChange={handleMemberChange}
            />
          </LeftArea>
          {
            selected && value &&
            <LogicFlowEditor
              key={selected}
              metas={logicFlowMeta}
              onChange={handleChange}
              toolbox={<Toolbox materialCategories={categories} />}
              propertyBox={<PropertyBox />}
              token={token}
              materials={getAllMaterial()}
            />
          }
        </SytledContent>
      </ControllerContext.Provider>
    </ControllersContext.Provider>
  )
})
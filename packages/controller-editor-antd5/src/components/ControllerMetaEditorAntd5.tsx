import { memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components";
import { ControllerContext } from "@rxdrag/minions-controller-editor";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { ControllersContext } from "@rxdrag/react-runner";
import { Members } from "./Members";
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5";
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import { VariableSelect } from "./VariableSelect";
import { ILocales } from "@rxdrag/locales";
import { useLocalesManager } from "@rxdrag/react-locales";
import { controllerEditorLocales } from "../locales";

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

export type ControllerMetaEditorAntd5Props = {
  lang?: string,
  locales?: ILocales,
  value: IControllerMeta,
  onChange?: (value?: IControllerMeta) => void,
  controllerMetas: IControllerMeta[],
  materialCategories: ActivityMaterialCategory<ReactNode>[],
}

export const ControllerMetaEditorAntd5 = memo((
  props: ControllerMetaEditorAntd5Props
) => {
  const { value, onChange, controllerMetas, materialCategories, ...other } = props
  const [localsRegiterFlag, setLocalsRegisterFlag] = useState(0)

  const [selected, setSelected] = useState<string>()

  const localesManger = useLocalesManager();

  useEffect(() => {
    localesManger?.registerLocales(controllerEditorLocales)
    setLocalsRegisterFlag(flag => flag + 1)
  }, [localesManger])

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
              key={localsRegiterFlag}
              value={value}
              selected={selected}
              onSelect={setSelected}
              onChange={handleMemberChange}
            />
          </LeftArea>
          {
            selected && value &&
            <LogicFlowEditorAntd5
              key={selected}
              value={logicFlowMeta}
              onChange={handleChange}
              materialCategories={materialCategories}
              setters={{ VariableSelect }}
              {...other}
            />
          }
        </SytledContent>
      </ControllerContext.Provider>
    </ControllersContext.Provider>
  )
})
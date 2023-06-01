import { memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components";
import { ControllerEditorContext, IControllerEditorContextParam, IEventMeta } from "@rxdrag/minions-controller-editor";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { Members } from "./Members";
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5";
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import { ILocales } from "@rxdrag/locales";
import { useLocalesManager } from "@rxdrag/react-locales";
import { controllerEditorLocales } from "../locales";
import { PropSelect, ReactionSelect, VariableSelect } from "@rxdrag/minions-react-materials";

const SytledContent = styled.div`
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
  eventMetas?: IEventMeta[],
  height?: number | string,
}

export const ControllerMetaEditorAntd5 = memo((
  props: ControllerMetaEditorAntd5Props
) => {
  const { value, onChange, controllerMetas, materialCategories, eventMetas, height, ...other } = props
  const [localsRegiterFlag, setLocalsRegisterFlag] = useState(0)
  const [selected, setSelected] = useState<string>()
  //const extractLogicFlowMetas = useExtractReferencedLogicFlowMetas();

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

  //把最新的数据传入
  const editorContextParam: IControllerEditorContextParam = useMemo(() => {
    return {
      controllers: controllerMetas,//controllerMetas.map(meta => meta.id === value.id ? { ...value, props: meta.props } : meta) || [],
      controller: value,
    }
  }, [controllerMetas, value])

  return (
    <ControllerEditorContext.Provider value={editorContextParam}>
      <SytledContent id="reactions-editor-container" style={{ height: height || 'calc(100vh - 160px)' }}>
        <LeftArea>
          <Members
            key={localsRegiterFlag}
            value={value}
            selected={selected}
            eventMetas={eventMetas}
            materialCategories={materialCategories}
            onSelect={setSelected}
            onChange={handleMemberChange}
          />
        </LeftArea>
        {
          logicFlowMeta && value &&
          <LogicFlowEditorAntd5
            key={logicFlowMeta.id}
            value={logicFlowMeta as ILogicMetas}
            onChange={handleChange}
            materialCategories={materialCategories}
            setters={{
              VariableSelect,
              PropSelect,
              ReactionSelect,
            }}
            //用于绘图显示subtitle
            logicFlowContext={editorContextParam}
            {...other}
          />
        }
      </SytledContent>
    </ControllerEditorContext.Provider>
  )
})
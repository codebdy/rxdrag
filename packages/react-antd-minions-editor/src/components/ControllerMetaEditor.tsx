import { IControllerMeta, ILogicMetas, IReactionMaterial } from "@rxdrag/schema";
import React, { memo, ReactNode, useCallback, useMemo, useState } from "react"
import styled from "styled-components";
import { ControllerContext, ControllersContext } from "../contexts";
import { ReactionMetaEditor } from "./ReactionMetaEditor"
import { Members } from "./Members";
import { Minions } from "@rxdrag/react-minions";
import { LocalesContext } from "@rxdrag/react-locales";
import { LocalesManager } from "@rxdrag/locales"
import { minionsEditorLocales } from "../locales";

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
export const ControllerMetaEditor = memo((
  props: {
    value: IControllerMeta,
    onChange?: (value?: IControllerMeta) => void,
    controllerMetas: IControllerMeta[],
    materials: IReactionMaterial<ReactNode>[],
    toolbox?: React.ReactNode,
    lang?: string,
  }
) => {
  const { value, onChange, controllerMetas, materials, toolbox, lang } = props
  const [localesManager] = useState(new LocalesManager(lang, minionsEditorLocales))
  const [selected, setSelected] = useState<string>()
  const handleMemberChange = useCallback((meta?: IControllerMeta) => {
    onChange?.(meta)
    onChange?.(meta)
  }, [onChange])

  const metas = useMemo(() => {
    const reaction = value?.reactions?.find(reaction => reaction.id === selected)
    if (reaction) {
      return reaction.logicMetas
    }

    return value?.events?.find(evt => evt.id === selected)?.logicMetas
  }, [selected, value?.events, value?.reactions])

  const handleChange = useCallback((newMetas: ILogicMetas) => {
    const newValue = {
      ...value,
      reactions: value?.reactions?.map(reaction => reaction.id === selected ? { ...reaction, logicMetas: newMetas } : reaction),
      events: value?.events?.map(event => event.id === selected ? { ...event, logicMetas: newMetas } : event),
    }
    onChange?.(newValue)
  }, [onChange, selected, value])

  return (
    <LocalesContext.Provider value={localesManager}>
      <Minions materials={materials}>
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
                <ReactionMetaEditor
                  key={selected}
                  metas={metas}
                  onChange={handleChange}
                  toolbox={toolbox}
                />
              }
            </SytledContent>
          </ControllerContext.Provider>
        </ControllersContext.Provider>
      </Minions>
    </LocalesContext.Provider>
  )
})
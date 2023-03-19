import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components";
import { Members } from "./components/Members";
import { IControllerMeta, ILogicMetas } from "runner/minions/interfaces/metas";
import { ReactionMetaEditor } from "./components/ReactionMetaEditor";
import { ControllerContext } from "./contexts";

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
export const ReactionsEditor = memo((
  props: {
    value: IControllerMeta,
    onChange?: (value?: IControllerMeta) => void,
  }
) => {
  const { value, onChange } = props
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
          />
        }
      </SytledContent>
    </ControllerContext.Provider>
  )
})
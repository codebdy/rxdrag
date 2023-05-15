import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ControllerContext, ControllersContext } from "../contexts";
import { ReactionMetaEditor } from "./ReactionMetaEditor";
import { Members } from "./Members";
import { Minions } from "@rxdrag/react-minions";
import { LocalesContext } from "@rxdrag/react-locales";
import { LocalesManager } from "@rxdrag/locales";
import { minionsEditorLocales } from "../locales";
const SytledContent = styled.div `
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
`;
const LeftArea = styled.div `
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 8px;
  overflow: auto;
`;
export const ControllerMetaEditor = memo((props) => {
    const { value, onChange, controllerMetas, materials, toolbox, lang, locales } = props;
    const [localesManager] = useState(new LocalesManager(lang, minionsEditorLocales));
    useEffect(() => {
        locales && localesManager.registerLocales(locales);
    }, [localesManager, locales]);
    const [selected, setSelected] = useState();
    const handleMemberChange = useCallback((meta) => {
        onChange?.(meta);
        onChange?.(meta);
    }, [onChange]);
    const metas = useMemo(() => {
        const reaction = value?.reactions?.find(reaction => reaction.id === selected);
        if (reaction) {
            return reaction.logicMetas;
        }
        return value?.events?.find(evt => evt.id === selected)?.logicMetas;
    }, [selected, value?.events, value?.reactions]);
    const handleChange = useCallback((newMetas) => {
        const newValue = {
            ...value,
            reactions: value?.reactions?.map(reaction => reaction.id === selected ? { ...reaction, logicMetas: newMetas } : reaction),
            events: value?.events?.map(event => event.id === selected ? { ...event, logicMetas: newMetas } : event),
        };
        onChange?.(newValue);
    }, [onChange, selected, value]);
    return (_jsx(LocalesContext.Provider, { value: localesManager, children: _jsx(Minions, { materials: materials, children: _jsx(ControllersContext.Provider, { value: controllerMetas, children: _jsx(ControllerContext.Provider, { value: value, children: _jsxs(SytledContent, { id: "reactions-editor-container", children: [_jsx(LeftArea, { children: _jsx(Members, { value: value, selected: selected, onSelect: setSelected, onChange: handleMemberChange }) }), selected && value &&
                                _jsx(ReactionMetaEditor, { metas: metas, onChange: handleChange, toolbox: toolbox }, selected)] }) }) }) }) }));
});

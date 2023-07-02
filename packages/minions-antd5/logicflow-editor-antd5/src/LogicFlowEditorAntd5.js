import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useState, useEffect } from "react";
import { LogicMetaEditorAntd5Inner } from "./LogicFlowEditorAntd5Inner";
import { LocalesManager } from "@rxdrag/locales";
import { LocalesContext } from "@rxdrag/react-locales";
export const LogicFlowEditorAntd5 = memo((props) => {
    const { lang = "zh-CN", locales, ...other } = props;
    const [localesManager] = useState(new LocalesManager(lang, locales));
    useEffect(() => {
        locales && localesManager.registerLocales(locales);
    }, [localesManager, locales]);
    return (_jsx(LocalesContext.Provider, { value: localesManager, children: _jsx(LogicMetaEditorAntd5Inner, { ...other }) }));
});

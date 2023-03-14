import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FileOutlined, GithubFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import { Antd5Editor } from "react-shells/ant5";
import { componentsIcon, historyIcon, outlineIcon } from "react-shells/ant5/icons";
import { HistoryWidget } from "react-shells/ant5/widgets/HistoryWidget";
import { LangButtons } from "react-shells/ant5/widgets/LangButtons";
import { LeftNavWidget } from "react-shells/ant5/widgets/LeftNavWidget";
import { Logo } from "react-shells/ant5/widgets/Logo";
import { OutlineWidget } from "react-shells/ant5/widgets/OutlineWidget";
import { ThemeButton } from "react-shells/ant5/widgets/ThemeButton";
import { toolsLocales } from "./locales";
import { ResourceWidget } from "./ResourceWidget";
import { SaveButton } from "./widgets/SaveButton";
import { PagesWidget } from "./PagesWidget";
import { pages } from "./data";
export var LeftNavType;
(function (LeftNavType) {
    LeftNavType["pages"] = "pages";
    LeftNavType["compoents"] = "components";
    LeftNavType["outline"] = "outline";
    LeftNavType["history"] = "history";
})(LeftNavType || (LeftNavType = {}));
export const Antd5Example = memo(() => {
    const [pageId, setPageId] = useState("dashboard");
    const [activedKey, setActivedKey] = useState(LeftNavType.compoents);
    const handleActive = useCallback((key) => {
        setActivedKey(key);
    }, []);
    const schemas = useMemo(() => {
        return pages[pageId];
    }, [pageId]);
    const handleSelect = useCallback((id) => {
        setPageId(id);
    }, []);
    return (_jsx(Antd5Editor, { schemas: schemas, canvasUrl: "/canvas-render", previewUrl: "/preview-render", themeMode: 'dark', navPanel: _jsxs(_Fragment, { children: [
                //ResourceWidget 内部会注册组件，要防止多次渲染
                _jsx(ResourceWidget, { display: activedKey === LeftNavType.compoents }), _jsx(PagesWidget, { display: activedKey === LeftNavType.pages, value: pageId, onSelect: handleSelect }), _jsx(HistoryWidget, { display: activedKey === LeftNavType.history }), _jsx(OutlineWidget, { display: activedKey === LeftNavType.outline })] }), topBar: _jsxs(_Fragment, { children: [_jsx(Logo, {}), _jsxs(Space, { children: [_jsx(ThemeButton, {}), _jsx(LangButtons, {}), _jsx(Button, { href: "https://github.com/rxdrag/rxeditor", target: "_blank", icon: _jsx(GithubFilled, {}), children: " Github" }), _jsx(SaveButton, {})] })] }), locales: toolsLocales, leftNav: _jsx(LeftNavWidget
        //showTitle
        , { 
            //showTitle
            defaultActivedKey: "components", items: [
                {
                    key: LeftNavType.pages,
                    title: "pages",
                    icon: _jsx(FileOutlined, { style: { fontSize: 18 } })
                },
                {
                    key: LeftNavType.compoents,
                    title: "components",
                    icon: componentsIcon
                },
                {
                    key: LeftNavType.outline,
                    title: "outline",
                    icon: outlineIcon
                },
                {
                    key: LeftNavType.history,
                    title: "history",
                    icon: historyIcon
                },
            ], onActive: handleActive }) }));
});

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SettingsForm } from "./SettingsForm";
import { Button as AntdButton, Space } from "antd";
import { LeftSidebar } from "./layouts/LeftSidebar";
import { Logo } from "./widgets/Logo";
import { GithubFilled } from "@ant-design/icons";
import { Topbar } from "./layouts/Topbar";
import { LeftNavWidget } from "./widgets/LeftNavWidget";
import { CenterContent } from "./layouts/CenterContent";
import { ToggleAblePane } from "./layouts/ToggleAblePane/ToggleAblePane";
import { ToggleType } from "./layouts/ToggleAblePane/ToggleButton";
import { commmonLocales } from "./locales";
import { ShellContainer } from "./pannels/ShellContainer";
import { LangButtons } from "./widgets/LangButtons";
import { SaveActions } from "./widgets/SaveActions";
import { ThemeButton } from "./widgets/ThemeButton";
import { ConfigRoot } from "./pannels/ShellContainer/ConfigRoot";
import { DocumentView } from "./pannels/DocumentView";
import { settingLocales } from "./SettingsForm/locales";
import "./style.less";
import { Root, Designer } from "@rxdrag/react-core";
import { componentsIcon, outlineIcon, historyIcon } from "@rxdrag/react-shared";
import { Workbench } from "./pannels";
export const RxEditorAntd = memo((props) => {
    const { leftNav, topBar, navPanel, locales, themeMode, schemas, children, canvasUrl, previewUrl } = props;
    const [doc, setDoc] = useState();
    const [engine, setEngine] = useState();
    const docRef = useRef();
    docRef.current = doc;
    useEffect(() => {
        if (engine) {
            console.log("创建 document");
            if (docRef.current) {
                docRef.current.destory();
                docRef.current = undefined;
            }
            const document = engine.createDocument(schemas);
            engine.getActions().changeActivedDocument(document.id);
            setDoc(document);
        }
    }, [engine, schemas]);
    const handleReady = useCallback((eng) => {
        const langMgr = eng.getLoacalesManager();
        langMgr.registerLocales(commmonLocales);
        langMgr.registerLocales(settingLocales);
        locales && langMgr.registerLocales(locales);
        //langMgr.registerResourceLocales(resourceLocales)
        //langMgr.registerComponentsLocales(componentLocales)
        setEngine(eng);
    }, [locales]);
    const initialComponents = useMemo(() => {
        return [
            {
                componentName: "Root",
                component: Root,
                designer: Root,
            }
        ];
    }, []);
    return (_jsx(Designer, { onReady: handleReady, themeMode: themeMode, components: initialComponents, children: _jsx(ConfigRoot, { children: _jsxs(ShellContainer, { children: [_jsx(Topbar, { children: topBar || _jsxs(_Fragment, { children: [_jsx(Logo, {}), _jsxs(Space, { children: [_jsx(ThemeButton, {}), _jsx(LangButtons, {}), _jsx(AntdButton, { href: "https://github.com/rxdrag/rxeditor", target: "_blank", icon: _jsx(GithubFilled, {}), children: " Github" }), _jsx(SaveActions, {})] })] }) }), _jsxs(Workbench, { children: [_jsx(LeftSidebar, { children: leftNav || _jsx(LeftNavWidget
                                //showTitle
                                , { 
                                    //showTitle
                                    defaultActivedKey: "components", items: [
                                        {
                                            key: "components",
                                            title: "components",
                                            icon: componentsIcon
                                        },
                                        {
                                            key: "outline",
                                            title: "outline",
                                            icon: outlineIcon
                                        },
                                        {
                                            key: "history",
                                            title: "history",
                                            icon: historyIcon
                                        },
                                    ] }) }), _jsx(ToggleAblePane, { children: navPanel }), _jsxs(CenterContent, { children: [_jsx(DocumentView, { doc: doc, canvasUrl: canvasUrl, previewUrl: previewUrl }), children] }), _jsx(ToggleAblePane, { toggleType: ToggleType.right, width: 300, children: _jsx(SettingsForm, {}) })] })] }) }) }));
});

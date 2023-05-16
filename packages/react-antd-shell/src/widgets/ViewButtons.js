import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDocumentViewTypeState, useActivedDocumentIdState, useActions, useToolsTranslate } from "@rxdrag/react-core";
import { designIcon, jsonIcon, playIcon } from "@rxdrag/react-shared";
import { Button, Space, Tooltip } from "antd";
import { memo, useCallback, useEffect } from "react";
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon";
export const ViewButtons = memo(() => {
    const [viewType, setViewType] = useDocumentViewTypeState();
    const [activedDocumentId] = useActivedDocumentIdState();
    const actions = useActions();
    const t = useToolsTranslate();
    useEffect(() => {
        actions?.selectNodes([], activedDocumentId || "");
    }, [actions, activedDocumentId, viewType]);
    const handleDesign = useCallback(() => {
        setViewType("design");
    }, [setViewType]);
    const handleJson = useCallback(() => {
        setViewType("json");
    }, [setViewType]);
    const handlePreview = useCallback(() => {
        setViewType("preview");
    }, [setViewType]);
    return (_jsxs(Space, { children: [_jsx(Tooltip, { title: t("design"), children: _jsx(Button, { size: "small", type: viewType === "design" ? "default" : "text", icon: _jsx(SvgIcon, { children: designIcon }), onClick: handleDesign }) }), _jsx(Tooltip, { title: t("jsonCode"), children: _jsx(Button, { size: "small", type: viewType === "json" ? "default" : "text", icon: _jsx(SvgIcon, { children: jsonIcon }), onClick: handleJson }) }), _jsx(Tooltip, { title: t("preview"), children: _jsx(Button, { size: "small", type: viewType === "preview" ? "default" : "text", icon: _jsx(SvgIcon, { children: playIcon }), onClick: handlePreview }) })] }));
});

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DocumentSelectionMode } from "@rxdrag/core";
import { useSelectionModeState, useToolsTranslate } from "@rxdrag/react-core";
import { moveIcon, selectionIcon } from "@rxdrag/react-shared";
import { Button, Space, Tooltip } from "antd";
import { memo, useCallback } from "react";
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon";
export const SelectionButtions = memo(() => {
    const [selectionMode, setSelectionMode] = useSelectionModeState();
    const t = useToolsTranslate();
    const handlePointSelect = useCallback(() => {
        setSelectionMode(DocumentSelectionMode.Normal);
    }, [setSelectionMode]);
    const handleRangeSelection = useCallback(() => {
        setSelectionMode(DocumentSelectionMode.RangeSelection);
    }, [setSelectionMode]);
    return (_jsxs(Space, { children: [_jsx(Tooltip, { title: t("pointSelection"), children: _jsx(Button, { type: selectionMode === DocumentSelectionMode.Normal ? "default" : "text", size: "small", icon: _jsx(SvgIcon, { children: moveIcon }), onClick: handlePointSelect }) }), _jsx(Tooltip, { title: t("boxSelection"), children: _jsx(Button, { type: selectionMode === DocumentSelectionMode.RangeSelection ? "default" : "text", size: "small", icon: _jsx(SvgIcon, { children: selectionIcon }), onClick: handleRangeSelection }) })] }));
});

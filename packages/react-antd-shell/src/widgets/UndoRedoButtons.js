import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUndo, useRedo, useToolsTranslate } from "@rxdrag/react-core";
import { undoIcon, redoIcon } from "@rxdrag/react-shared";
import { Button, Space, Tooltip } from "antd";
import { memo } from "react";
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon";
export const UndoRedoButtons = memo(() => {
    const [canUndo, undo] = useUndo();
    const [canRedo, redo] = useRedo();
    const t = useToolsTranslate();
    return (_jsxs(Space, { children: [_jsx(Tooltip, { title: t("undo"), children: _jsx(Button, { size: "small", type: "text", icon: _jsx(SvgIcon, { children: undoIcon }), disabled: !canUndo, onClick: undo }) }), _jsx(Tooltip, { title: t("redo"), children: _jsx(Button, { size: "small", type: "text", icon: _jsx(SvgIcon, { children: redoIcon }), disabled: !canRedo, onClick: redo }) })] }));
});

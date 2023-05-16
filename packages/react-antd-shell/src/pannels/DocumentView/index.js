import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DocumentRoot, JsonView, IframeCanvas } from "@rxdrag/react-core";
import { Divider } from "antd";
import { memo } from "react";
import { IframePreview } from "../../components/Preview/IframePreview";
import { CanvasToolbar } from "../../layouts";
import { UndoRedoButtons, SelectionButtions, AuxButtionsButtions, CanvasSize, ViewButtons, NavbarWidget } from "../../widgets";
import { Viewport } from "../Viewport";
export const DocumentView = memo((props) => {
    const { doc, canvasUrl, previewUrl } = props;
    return (doc ?
        _jsxs(DocumentRoot, { doc: doc, children: [_jsxs(CanvasToolbar, { children: [_jsx(UndoRedoButtons, {}), _jsx(Divider, { type: "vertical", style: { height: 16 } }), _jsx(SelectionButtions, {}), _jsx(Divider, { type: "vertical", style: { height: 16 } }), _jsx(AuxButtionsButtions, {}), _jsx(Divider, { type: "vertical", style: { height: 16 } }), _jsx(CanvasSize, {}), _jsx("div", { style: { flex: 1 } }), _jsx(ViewButtons, {})] }), _jsxs(Viewport, { children: [_jsx(JsonView, {}), _jsx(IframeCanvas, { doc: doc, renderUrl: canvasUrl }), _jsx(IframePreview, { doc: doc, renderUrl: previewUrl })] }), _jsx(NavbarWidget, {})] })
        : _jsx(_Fragment, {}));
});

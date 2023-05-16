import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDesignerEngine, useDocument, useToolsTranslate } from "@rxdrag/react-core";
import { lineIcon, marginIcon } from "@rxdrag/react-shared";
import { Button, Space, Tooltip } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { LineDecorator, LINE_DECORTOR_NAME } from "../decorators/LineDecorator";
import { MarginDecorator, MARGIN_DECORATOR_NAME } from "../decorators/MarginDecorator";
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon";
export const AuxButtionsButtions = memo(() => {
    const [margin, setMarin] = useState(false);
    const [line, setLine] = useState(false);
    const engine = useDesignerEngine();
    const documentId = useDocument()?.id || "";
    useEffect(() => {
        setMarin(!!engine?.getDecoratorManager().getDecorator(MARGIN_DECORATOR_NAME, documentId));
        setLine(!!engine?.getDecoratorManager().getDecorator(LINE_DECORTOR_NAME, documentId));
    }, [documentId, engine]);
    const handleLineClick = useCallback(() => {
        if (line) {
            engine?.getDecoratorManager().removeDecorator(LINE_DECORTOR_NAME, documentId);
            setLine(false);
        }
        else {
            engine?.getDecoratorManager().addDecorator(new LineDecorator(), documentId);
            setLine(true);
        }
    }, [documentId, engine, line]);
    const handleMarginClick = useCallback(() => {
        if (margin) {
            engine?.getDecoratorManager().removeDecorator(MARGIN_DECORATOR_NAME, documentId);
            setMarin(false);
        }
        else {
            engine?.getDecoratorManager().addDecorator(new MarginDecorator(), documentId);
            setMarin(true);
        }
    }, [documentId, engine, margin]);
    const t = useToolsTranslate();
    return (_jsxs(Space, { children: [_jsx(Tooltip, { title: t("auxLine"), children: _jsx(Button, { type: line ? "default" : "text", size: "small", icon: _jsx(SvgIcon, { children: lineIcon }), onClick: handleLineClick }) }), _jsx(Tooltip, { title: t("auxMargin"), children: _jsx(Button, { type: margin ? "default" : "text", size: "small", icon: _jsx(SvgIcon, { children: marginIcon }), onClick: handleMarginClick }) })] }));
});

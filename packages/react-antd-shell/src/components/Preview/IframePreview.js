import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { memo } from "react";
import { useDocumentViewTypeState, useDesignerEngine, CanvasShell } from "@rxdrag/react-core";
export const IframePreview = memo((props) => {
    const { doc, renderUrl } = props;
    const [viewType] = useDocumentViewTypeState(doc?.id);
    const engine = useDesignerEngine();
    const handleRefChange = useCallback((el) => {
        if (el && engine && el?.contentWindow) {
            if (el.contentWindow) {
                el.contentWindow["engine"] = engine;
                el.contentWindow["doc"] = doc;
            }
        }
    }, [doc, engine]);
    const key = useMemo(() => `preview-${doc.id}`, [doc.id]);
    return (_jsx(CanvasShell, { display: viewType === "preview", children: _jsx("iframe", { ref: handleRefChange, title: key, style: { border: "0", width: "100%", height: "100%" }, src: renderUrl }, key) }));
});

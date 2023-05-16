import { jsx as _jsx } from "react/jsx-runtime";
import { DesignerEngineContext } from "@rxdrag/react-core";
import { memo } from "react";
import { PreviewRender } from "./PreviewRender";
export const IFramePreviewRender = memo((props) => {
    const { components, activityMaterials } = props;
    const engine = window.engine;
    const doc = window.doc;
    return (_jsx(DesignerEngineContext.Provider, { value: engine, children: doc ?
            _jsx(PreviewRender, { doc: doc, components: components, activityMaterials: activityMaterials })
            : null }));
});

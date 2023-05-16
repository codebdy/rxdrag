import { jsx as _jsx } from "react/jsx-runtime";
import { useDocumentViewTypeState } from "@rxdrag/react-core";
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy";
import { ComponentRender, PreviewRoot } from "@rxdrag/react-runner";
import { useToken } from "antd/es/theme/internal";
import { memo, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Minions } from "@rxdrag/react-minions";
export const PreviewRender = memo((props) => {
    const { components, doc, activityMaterials } = props;
    const [tree, setTree] = useState();
    const [viewType] = useDocumentViewTypeState(doc?.id);
    const [, token] = useToken();
    const theme = useMemo(() => {
        return {
            token
        };
    }, [token]);
    useEffect(() => {
        if (viewType === 'preview') {
            setTree(doc?.getSchemaTree() || undefined);
        }
    }, [doc, viewType]);
    return (_jsx(ThemeProvider, { theme: theme, children: tree &&
            _jsx(PreviewRoot, { components: components, children: _jsx(Minions, { materials: activityMaterials, children: _jsx(Fieldy, { children: _jsx(VirtualForm, { children: _jsx(ComponentRender, { root: tree }) }) }) }) }) }));
});

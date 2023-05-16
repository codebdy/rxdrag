import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useActiveIdState, useCurrentNode, useTreeNode, useSelect } from "@rxdrag/react-core";
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useMemo } from "react";
export const NodeTag = memo((props) => {
    const { nextBgColor, nodeId } = props;
    const [activedId, setActivedId] = useActiveIdState();
    const currentNode = useCurrentNode();
    const [, token] = useToken();
    const node = useTreeNode(nodeId);
    const select = useSelect();
    const handleMouseOver = useCallback(() => {
        setActivedId(nodeId);
    }, [nodeId, setActivedId]);
    const handleMouseLeave = useCallback(() => {
        setActivedId(undefined);
    }, [setActivedId]);
    const selected = useMemo(() => nodeId === currentNode?.id, [currentNode?.id, nodeId]);
    const backgroundColor = useMemo(() => {
        if ((activedId === nodeId) && !selected) {
            return token.colorBgBase;
        }
        if (selected) {
            return token.colorPrimary;
        }
        return token.colorBorderSecondary;
    }, [activedId, nodeId, selected, token.colorBgBase, token.colorBorderSecondary, token.colorPrimary]);
    const color = useMemo(() => {
        if (selected) {
            return token.colorWhite;
        }
        return token.colorText;
    }, [selected, token.colorText, token.colorWhite]);
    const handleClick = useCallback(() => {
        node && select(node);
    }, [node, select]);
    return (_jsxs(_Fragment, { children: [node?.parentId &&
                _jsx(NodeTag, { nodeId: node?.parentId, nextBgColor: backgroundColor }), _jsxs("div", { className: "one-node", style: { backgroundColor: backgroundColor, color }, onMouseOver: handleMouseOver, onMouseLeave: handleMouseLeave, onClick: handleClick, children: [_jsx("div", { className: "node-label", children: node?.title || node?.meta.componentName }), _jsxs("svg", { "data-icon": "BreadcrumbPartLeft", "aria-hidden": "true", focusable: "false", width: "7", height: "28", viewBox: "0 0 7 28", children: [_jsx("path", { fill: nextBgColor || token.colorBorderSecondary, d: "M.5 0l6 14-6 14H7V0z" }), _jsx("path", { fill: token.colorBorder, d: "M1 0H0l6 14-6 14h1l6-14z" })] })] })] }));
});

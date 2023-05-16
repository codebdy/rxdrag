import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DownOutlined } from "@ant-design/icons";
import { useActiveIdState, useGetNode, useActions, useCurrentTree, useNodeChanged, useSelectedNodeIds } from "@rxdrag/react-core";
import { Tree } from "antd";
import { memo, useCallback, useMemo } from "react";
import { PaneContainer } from "../../layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "../../layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "../../layouts/ToggleAblePane/PaneTitle";
export const OutlineWidget = memo((props) => {
    const { display } = props;
    const [activedId, setActivedId] = useActiveIdState();
    const getNode = useGetNode();
    const actions = useActions();
    const currentTree = useCurrentTree();
    const nodeChangeFlag = useNodeChanged();
    const selectedNodeIds = useSelectedNodeIds(currentTree?.documentId);
    const transNode = useCallback((id) => {
        const node = getNode(id);
        const children = node?.children?.map(childId => transNode(childId)).filter(nd => nd !== undefined) || [];
        for (const key of Object.keys(node?.slots || {})) {
            const slotId = node?.slots?.[key];
            if (slotId) {
                const slot = transNode(slotId);
                if (slot) {
                    children.push(slot);
                }
            }
        }
        if (node) {
            return {
                title: node.title,
                key: node.id,
                children: children
            };
        }
        return undefined;
    }, [getNode]);
    const treeItems = useMemo(() => {
        if (!currentTree) {
            return [];
        }
        const root = transNode(currentTree.id);
        if (!root) {
            return [];
        }
        return [
            root
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTree, nodeChangeFlag, transNode]);
    const onSelect = useCallback((selectedKeys) => {
        if (currentTree) {
            actions?.selectNodes(selectedKeys, currentTree?.documentId);
        }
    }, [actions, currentTree]);
    const handleMouseEnter = useCallback((info) => {
        setActivedId(info?.node?.key);
    }, [setActivedId]);
    const handleMouseLeave = useCallback(() => {
        setActivedId(null);
    }, [setActivedId]);
    return (_jsxs(PaneContainer, { style: { display: display ? undefined : "none" }, children: [_jsx(PaneTitle, { title: "outline" }), _jsx(PanelContent, { style: { paddingTop: 8 }, children: _jsx(Tree, { showLine: true, switcherIcon: _jsx(DownOutlined, {}), defaultExpandedKeys: [currentTree?.id || ""], activeKey: activedId || "", selectedKeys: selectedNodeIds || undefined, onSelect: onSelect, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, treeData: treeItems }) })] }));
});

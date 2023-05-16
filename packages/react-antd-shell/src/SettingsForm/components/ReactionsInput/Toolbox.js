import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { Collapse as AntdCollapse, Row } from "antd";
import styled from "styled-components";
import { activityMaterialCategories } from "@rxdrag/react-minions-materials";
import { ComponentList } from "./ComponentList";
import { ReactionResource, ToolItem, useTrans } from "@rxdrag/react-antd-minions-editor";
const Collapse = styled(AntdCollapse) `
  flex:1;
  border-radius: 0;
  overflow: auto;
`;
const { Panel } = AntdCollapse;
export const Toolbox = memo(() => {
    const t = useTrans();
    return (_jsxs(Collapse, { defaultActiveKey: [activityMaterialCategories?.[0]?.name], bordered: false, accordion: true, expandIconPosition: "end", children: [activityMaterialCategories.map(category => {
                return (_jsx(Panel, { header: t(category.name), children: _jsx(Row, { gutter: 8, children: category.materials.map((reaction) => {
                            return _jsx(ReactionResource, { material: reaction, children: (onStartDrag) => {
                                    return _jsx(ToolItem, { icon: reaction.icon, title: reaction.label, color: reaction.color, onMouseDown: onStartDrag });
                                } }, reaction.name);
                        }) }) }, category.name));
            }), _jsx(Panel, { header: t('$componentControl'), children: _jsx(ComponentList, {}) }, "componentControl")] }));
});

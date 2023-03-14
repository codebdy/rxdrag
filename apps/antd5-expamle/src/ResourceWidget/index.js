import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useEffect } from "react";
import { ResourceCollapsePannel } from "expamples/ant5/ResourceWidget/ResourceCollapsePannel";
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer";
import { ResourcesTitle } from "expamples/ant5/ResourceWidget/ResourcesTitle";
import { ComponentResourceWidget } from "react-shells/ant5/widgets/ComponentResourceWidget";
import { fields, materials } from "../materials";
import { useRegisterComponentMaterial } from "core-react/hooks/useRegisterComponentMaterial";
import { FieldMaterial } from "../materials/fields/Field";
import { TemplateResourceWidget } from "react-shells/ant5/widgets/TemplateResourceWidget";
export const ResourceWidget = memo((props) => {
    const { display } = props;
    const t = useToolsTranslate();
    const registerMaterial = useRegisterComponentMaterial();
    //注册通用物料
    useEffect(() => {
        registerMaterial(FieldMaterial);
    }, [registerMaterial]);
    return (_jsxs(PaneContainer, { className: "rx-resource-contianer", style: { display: display ? undefined : "none" }, children: [_jsx(ResourcesTitle, {}), _jsxs("div", { style: { flex: 1, overflow: "auto" }, children: [materials.map((group => {
                        return (_jsx(ResourceCollapsePannel, { title: t(group.titleKey), defaultExpand: true, children: group.items.map((material => {
                                return (_jsx(ComponentResourceWidget, { meterial: material }, material.componentName));
                            })) }, group.titleKey));
                    })), _jsx(ResourceCollapsePannel, { title: t("fields"), defaultExpand: true, children: fields.map(field => {
                            return (_jsx(TemplateResourceWidget, { resource: field }, field.name));
                        }) })] })] }));
});

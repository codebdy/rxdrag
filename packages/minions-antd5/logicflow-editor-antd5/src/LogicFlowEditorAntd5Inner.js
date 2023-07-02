import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback, useMemo, useState } from "react";
import { Toolbox, PropertyBox, Toolbar } from "./components";
import { useTransMaterialCategorys } from "./hooks/useTransMaterialCategorys";
import { LogicFlowEditor } from "@rxdrag/minions-logicflow-editor";
import { useToken } from "antd/es/theme/internal";
export const LogicMetaEditorAntd5Inner = memo((props) => {
    const { value, onChange, materialCategories, setters, logicFlowContext, canBeReferencedLogflowMetas } = props;
    const [showMap, setShowMap] = useState(false);
    const [, token] = useToken();
    const categories = useTransMaterialCategorys(materialCategories);
    const materials = useMemo(() => {
        const materials = [];
        return materials.concat(...categories.map(category => category.materials));
    }, [categories]);
    const handleToggleShowMap = useCallback(() => {
        setShowMap(show => !show);
    }, []);
    return (_jsx(LogicFlowEditor, { value: value, onChange: onChange, toolbar: _jsx(Toolbar, { showMap: showMap, toggleShowMap: handleToggleShowMap }), toolbox: _jsx(Toolbox, { materialCategories: categories }), propertyBox: _jsx(PropertyBox, { setters: setters }), token: token, materials: materials, showMap: showMap, logicFlowContext: logicFlowContext, canBeReferencedLogflowMetas: canBeReferencedLogflowMetas }));
});

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDesignerEngine, useLanguage } from "@rxdrag/react-core";
import { Radio } from "antd";
import { memo, useCallback } from "react";
export const LangButtons = memo(() => {
    const engine = useDesignerEngine();
    const lang = useLanguage();
    const handleLangChange = useCallback((e) => {
        engine?.setLanguage(e.target.value);
    }, [engine]);
    return (_jsxs(Radio.Group, { defaultValue: "zh-CN", onChange: handleLangChange, value: lang, children: [_jsx(Radio.Button, { value: "zh-CN", children: "\u7B80\u4F53\u4E2D\u6587" }), _jsx(Radio.Button, { value: "en-US", children: "English" })] }));
});

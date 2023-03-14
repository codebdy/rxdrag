import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IFrameCanvasRender } from 'core-react/canvas/IframeCanvas/IFrameCanvasRender';
import { IFramePreviewRender } from 'core-react/Preview/IFramePreviewRender';
import { Antd5Example } from 'expamples/ant5';
import { usePredefinedComponents } from 'expamples/ant5/hooks/usePredefinedComponents';
import { Routes, Route } from 'react-router-dom';
import { getAllMaterial } from 'react-shells/ant5/materials';
import './App.css';
function App() {
    const { designers, components } = usePredefinedComponents();
    return (_jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Antd5Example, {}) }), _jsx(Route, { path: '/canvas-render', element: _jsx(IFrameCanvasRender, { designers: designers }) }), _jsx(Route, { path: '/preview-render', element: _jsx(IFramePreviewRender, { components: components, reactionMaterials: getAllMaterial() }) })] }));
}
export default App;

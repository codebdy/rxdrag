import { IFrameCanvasRender } from 'core-react/canvas/IframeCanvas/IFrameCanvasRender';
import { IFramePreviewRender } from 'core-react/Preview/IFramePreviewRender';
import { Antd5Example } from 'expamples/ant5';
import { usePredefinedComponents } from 'expamples/ant5/hooks/usePredefinedComponents';
import { Routes, Route } from 'react-router-dom';
import { getAllMaterial } from 'react-shells/ant5/materials';
import './App.css';

function App() {
  const { designers, components } = usePredefinedComponents()
  return (
    <Routes>
      <Route path={'/'} element={<Antd5Example />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreviewRender components={components} reactionMaterials={getAllMaterial()} />}>
      </Route>
    </Routes>

  );
}

export default App;

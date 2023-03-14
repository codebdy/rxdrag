import { Antd5Example } from './Antd5Example';
import { IFrameCanvasRender, IFramePreviewRender } from '@rxdrag/react-core';
import { Routes, Route } from 'react-router-dom';
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

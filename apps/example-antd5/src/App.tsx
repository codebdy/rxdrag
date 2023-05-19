import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IFrameCanvasRender } from '@rxdrag/react-core';
import { IFramePreviewRender } from "@rxdrag/react-antd-shell"
import { usePredefinedComponents } from './hooks/usePredefinedComponents';
import { Antd5Example } from './Antd5Example';

function App() {
  const { designers, components } = usePredefinedComponents()
  return (
    <Routes>
      <Route path={'/'} element={<Antd5Example />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreviewRender components={components} />}>
      </Route>
    </Routes>

  );
}

export default App;

import { IFrameCanvasRender } from 'core-react/canvas/IframeCanvas/IFrameCanvasRender';
import { Antd5Example } from 'expamples/ant5';
import { usePredefinedComponents } from 'expamples/ant5/hooks/usePredefinedComponents';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const { designers } = usePredefinedComponents()
  return (
    <Routes>
      <Route path={'/'} element={<Antd5Example />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender designers ={designers} />}>
      </Route>
    </Routes>

  );
}

export default App;

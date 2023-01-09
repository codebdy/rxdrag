import { IFrameCanvasRender } from 'core-react/canvas/IframeCanvas/IFrameCanvasRender';
import { Antd5Example } from 'expamples/ant5';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Antd5Example />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender />}>
      </Route>
    </Routes>

  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IFrameCanvasRender } from '@rxdrag/react-core';
import { IFramePreviewRender } from "@rxdrag/react-antd-shell"
import { usePredefinedComponents } from './hooks/usePredefinedComponents';
import { Antd5Example } from './Antd5Example';
import { useMemo } from 'react';
import { controllerDefines } from 'controller/defines';
import { ControllerFactories } from '@rxdrag/react-runner';

function App() {
  const { designers, components } = usePredefinedComponents()

  //需要的控制器
  const controllerFactories = useMemo(() => {
    const factories: ControllerFactories = {}
    for (const ctrlDef of controllerDefines) {
      factories[ctrlDef.name] = ctrlDef.factory
    }
    return factories
  }, [])

  return (
    <Routes>
      <Route path={'/'} element={<Antd5Example />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreviewRender components={components} controllerFactories={controllerFactories} />}>
      </Route>
    </Routes>

  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IFrameCanvasRender } from '@rxdrag/react-core';
import { IFramePreviewRender } from "@rxdrag/react-antd-shell"
import { Antd5Example } from './normal/Antd5Example';
import { useMemo } from 'react';
import { ControllerFactories } from '@rxdrag/react-runner';
import { InlineExample } from 'inline';
import { controllerDefines } from 'normal/controller/defines';
import { usePredefinedComponents } from 'normal/hooks/usePredefinedComponents';
import { routes } from 'common';

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
      <Route path={routes.index} element={<Antd5Example />}>
      </Route>
      <Route path={routes.inline} element={<InlineExample />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvasRender designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreviewRender components={components} controllerFactories={controllerFactories} />}>
      </Route>
    </Routes>

  );
}

export default App;

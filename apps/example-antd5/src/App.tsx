import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Antd5Example } from './normal/Antd5Example';
import { useMemo } from 'react';
import { ControllerFactories } from '@rxdrag/react-runner';
import { controllerDefines } from 'normal/controller/defines';
import { usePredefinedComponents } from 'normal/hooks/usePredefinedComponents';
import { routes } from 'example-common';
import { InlineEditorExample } from "inline-editor-example";
import { LogicflowEditorExample } from "logicflow-editor-example";
import { ControllerEditorExample } from "controller-editor-example";
import { IFrameCanvas } from 'IFrameCanvas';
import { IFramePreview } from 'IFramePreview';

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
      <Route path={routes.inline} element={<InlineEditorExample />}>
      </Route>
      <Route path={routes.controller} element={<ControllerEditorExample />}>
      </Route>
      <Route path={routes.logicflow} element={<LogicflowEditorExample />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvas designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreview components={components} controllerFactories={controllerFactories} />}>
      </Route>
    </Routes>

  );//
}

export default App;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useMemo } from 'react';
import { ControllerFactories } from '@rxdrag/react-runner';
import { controllerDefines, routes } from 'example-common';
import { InlineEditorExample } from "inline-editor-example";
import { LogicflowEditorExample } from "logicflow-editor-example";
import { ControllerEditorExample } from "controller-editor-example";
import { NormalEditorExample, usePredefinedComponents } from "normal-editor-example"
import { RuntimeExample } from "runtime-example"
import { LargeScreenExample } from "large-screen-example"
import { IFrameCanvas, IFramePreview } from '@rxdrag/react-antd-shell';

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
      <Route path={routes.index} element={<NormalEditorExample />}>
      </Route>
      <Route path={routes.inline} element={<InlineEditorExample />}>
      </Route>
      <Route path={routes.controller} element={<ControllerEditorExample />}>
      </Route>
      <Route path={routes.logicflow} element={<LogicflowEditorExample />}>
      </Route>
      <Route path={'/canvas-render/:id?'} element={<IFrameCanvas designers={designers} />}>
      </Route>
      <Route path={'/preview-render/:id?'} element={<IFramePreview components={components} controllerFactories={controllerFactories} />}>
      </Route>
      <Route path={routes.runtime} element={<RuntimeExample />}>
      </Route>
      <Route path={routes.largeScreen} element={<LargeScreenExample />}>
      </Route>
    </Routes>

  );//
}

export default App;

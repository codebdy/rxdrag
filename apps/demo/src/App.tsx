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
import { LargeScreenExample, largeScreenComponents, largeScreenDesigners } from "large-screen-example"
import { IFrameCanvas, IFramePreview } from '@rxdrag/react-antd-shell';
import { AppDesignerExample } from "app-designer-example"

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
      <Route path={'/canvas-render'} element={<IFrameCanvas designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreview components={components} controllerFactories={controllerFactories} />}>
      </Route>
      <Route path={routes.runtime} element={<RuntimeExample />}>
      </Route>
      <Route path={'/large-screen-canvas-render'} element={<IFrameCanvas designers={largeScreenDesigners} />}>
      </Route>
      <Route path={'/large-screen-/preview-render'} element={<IFramePreview components={largeScreenComponents} controllerFactories={controllerFactories} />}>
      </Route>
      <Route
        path={routes.largeScreen}
        element={
          <LargeScreenExample
            canvasUrl="/large-screen-canvas-render"
            previewUrl="/large-screen-/preview-render"
          />}
      >
      </Route>
      <Route
        path={routes.appDesigner + "/*"}
        element={
          <AppDesignerExample
            canvasUrl="/canvas-render"
            previewUrl="/preview-render"
          />}
      >
      </Route>
    </Routes>

  );//
}

export default App;

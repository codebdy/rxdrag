import { Routes, Route } from 'react-router-dom';
import './App.css';
import { routes } from 'example-common';
import { LogicflowEditorExample } from "logicflow-editor-example";
import { NormalEditorExample, usePredefinedComponents } from "normal-editor-example"
import { RuntimeExample } from "runtime-example"
import { LargeScreenExample, largeScreenComponents, largeScreenDesigners } from "large-screen-example"
import { IFrameCanvas, IFramePreview } from '@rxdrag/react-antd-shell';
import { AppDesignerExample } from "app-designer-example"

function App() {
  const { designers, components } = usePredefinedComponents()

  return (
    <Routes>
      <Route path={routes.normal} element={<NormalEditorExample />}>
      </Route>
      <Route path={routes.logicflow} element={<LogicflowEditorExample />}>
      </Route>
      <Route path={'/canvas-render'} element={<IFrameCanvas designers={designers} />}>
      </Route>
      <Route path={'/preview-render'} element={<IFramePreview components={components} />}>
      </Route>
      <Route path={routes.runtime} element={<RuntimeExample />}>
      </Route>
      <Route path={'/large-screen-canvas-render'} element={<IFrameCanvas designers={largeScreenDesigners} />}>
      </Route>
      <Route path={'/large-screen-/preview-render'} element={<IFramePreview components={largeScreenComponents} />}>
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
        path={"/*"}
        element={
          <AppDesignerExample />}
      >
      </Route>
    </Routes>

  );//
}

export default App;

import { IDesignerEngine, IDocument } from "core"
import { memo, useMemo } from "react"
import { DesignerEngineContext } from "core-react/contexts";
import { ComponentTreeWidget } from "core-react/ComponentTreeWidget";
import { DesignRoot } from "core-react/DesignRoot";
import { IComponents } from "core-react/interfaces";
import { Scroller } from "./Scroller";
import { ThemeProvider } from "styled-components";
import { useToken } from "antd/es/theme/internal";


export const CanvasRender = memo((props: {
  doc: IDocument,
  engine?: IDesignerEngine,
  components?: IComponents
}) => {
  const { doc, engine, components } = props;
  const [, token] = useToken()
  const theme = useMemo(() => {
    return {
      token
    }
  }, [token])
  return (
    <ThemeProvider theme={theme}>
    <DesignerEngineContext.Provider value={engine}>
      <DesignRoot components={components}>
        <Scroller />
        <ComponentTreeWidget doc={doc} />
      </DesignRoot>
    </DesignerEngineContext.Provider>
    </ThemeProvider>
  )
})
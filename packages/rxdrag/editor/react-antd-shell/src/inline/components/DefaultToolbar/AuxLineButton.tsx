import { Button } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { useDesignerEngine, useDocument } from "@rxdrag/react-core";
import { LINE_DECORTOR_NAME, LineDecorator } from "@rxdrag/core";
import { lineIcon } from "@rxdrag/react-shared";

export const AuxLineButton = memo(() => {
  const [line, setLine] = useState(false);

  const engine = useDesignerEngine();
  const documentId = useDocument()?.id || "";

  useEffect(() => {
    setLine(!!engine?.getDecoratorManager().getDecorator(LINE_DECORTOR_NAME, documentId))
  }, [documentId, engine])

  const handleLineClick = useCallback(() => {
    if (line) {
      engine?.getDecoratorManager().removeDecorator(LINE_DECORTOR_NAME, documentId)
      setLine(false)
    } else {
      engine?.getDecoratorManager().addDecorator(new LineDecorator(), documentId)
      setLine(true)
    }
  }, [documentId, engine, line])

  return (
    <Button
      type={line ? "default" : "text"}
      size="large"
      icon={lineIcon}
      onClick={handleLineClick}
    />
  )
})
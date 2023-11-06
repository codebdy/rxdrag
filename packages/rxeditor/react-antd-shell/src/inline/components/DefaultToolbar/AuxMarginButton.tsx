import { Button } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { MARGIN_DECORATOR_NAME, MarginDecorator } from "@rxdrag/core";
import { useDesignerEngine, useDocument } from "@rxdrag/react-core";
import { marginIcon } from "@rxdrag/react-shared";

export const AuxMarginButton = memo(() => {
  const [margin, setMarin] = useState(false);

  const engine = useDesignerEngine();
  const documentId = useDocument()?.id || "";
  useEffect(() => {
    setMarin(!!engine?.getDecoratorManager().getDecorator(MARGIN_DECORATOR_NAME, documentId))
  }, [documentId, engine])


  const handleMarginClick = useCallback(() => {
    if (margin) {
      engine?.getDecoratorManager().removeDecorator(MARGIN_DECORATOR_NAME, documentId)
      setMarin(false)
    } else {
      engine?.getDecoratorManager().addDecorator(new MarginDecorator(), documentId)
      setMarin(true)
    }
  }, [documentId, engine, margin])
  return (
    <Button
      type={margin ? "default" : "text"}
      size="large"
      icon={marginIcon}
      onClick={handleMarginClick}
    />
  )
})
import { useDesignerEngine, useDocument, useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { SvgIcon } from "../../common/SvgIcon"
import { MARGIN_DECORATOR_NAME, LINE_DECORTOR_NAME, LineDecorator, MarginDecorator } from "@rxdrag/core"
import { lineIcon, marginIcon } from "@rxdrag/react-shared"

export const AuxButtions = memo(() => {
  const [margin, setMarin] = useState(false);
  const [line, setLine] = useState(false);

  const engine = useDesignerEngine();
  const documentId = useDocument()?.id || "";
  useEffect(() => {
    setMarin(!!engine?.getDecoratorManager().getDecorator(MARGIN_DECORATOR_NAME, documentId))
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

  const handleMarginClick = useCallback(() => {
    if (margin) {
      engine?.getDecoratorManager().removeDecorator(MARGIN_DECORATOR_NAME, documentId)
      setMarin(false)
    } else {
      engine?.getDecoratorManager().addDecorator(new MarginDecorator(), documentId)
      setMarin(true)
    }
  }, [documentId, engine, margin])

  const t = useSettersTranslate()
  return (
    <Space>
      <Tooltip title={t("auxLine")}>
        <Button type={line ? "default" : "text"} size="small"
          icon={
            <SvgIcon>
              {lineIcon}
            </SvgIcon>
          }
          onClick={handleLineClick}
        />
      </Tooltip>
      <Tooltip title={t("auxMargin")}>
        <Button
          type={margin ? "default" : "text"}
          size="small"
          icon={
            <SvgIcon>
              {marginIcon}
            </SvgIcon>
          }
          onClick={handleMarginClick}
        />
      </Tooltip>
    </Space>
  )
})
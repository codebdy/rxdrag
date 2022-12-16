import { Button, Space } from "antd"
import { useActions } from "core-react/hooks/useActions"
import { useActivedDocumentIdState } from "core-react/hooks/useActivedDocumentIdState"
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState"
import { memo, useCallback, useEffect } from "react"
import { designIcon, jsonIcon, playIcon } from "../icons"
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon"

export const ViewButtons = memo(() => {
  const [viewType, setViewType] = useDocumentViewTypeState()
  const [activedDocumentId] = useActivedDocumentIdState()
  const actions = useActions()

  useEffect(() => {
    actions?.selectNodes([], activedDocumentId || "")
  }, [actions, activedDocumentId, viewType])

  const handleDesign = useCallback(() => {
    setViewType("design")
  }, [setViewType])

  const handleJson = useCallback(() => {
    setViewType("json")
  }, [setViewType])

  const handlePreview = useCallback(() => {
    setViewType("preview")
  }, [setViewType])
  return (
    <Space>
      <Button
        size="small"
        type={viewType === "design" ? "default" : "text"}
        icon={
          <SvgIcon>
            {designIcon}
          </SvgIcon>
        }

        onClick={handleDesign}
      />
      <Button
        size="small"
        type={viewType === "json" ? "default" : "text"}
        icon={
          <SvgIcon>
            {jsonIcon}
          </SvgIcon>
        }
        onClick={handleJson}
      />
      <Button
        size="small"
        type={viewType === "preview" ? "default" : "text"}
        icon={
          <SvgIcon>
            {playIcon}
          </SvgIcon>
        }
        onClick={handlePreview}
      />
    </Space>
  )
})
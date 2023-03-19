import { Radio, RadioChangeEvent } from "antd"
import { useDesignerEngine } from "core-react/hooks"
import { useLanguage } from "core-react/hooks/useLanguage"
import { memo, useCallback } from "react"

export const LangButtons = memo(() => {
  const engine = useDesignerEngine()
  const lang = useLanguage()
  const handleLangChange = useCallback((e: RadioChangeEvent) => {
    engine?.setLanguage(e.target.value)
  }, [engine])

  return (
    <Radio.Group defaultValue="zh-CN" onChange={handleLangChange} value={lang}>
      <Radio.Button value="zh-CN">简体中文</Radio.Button>
      <Radio.Button value="en-US">English</Radio.Button>
    </Radio.Group>
  )
})
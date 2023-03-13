import { useEffect, useState } from "react";
import { useDesignerEngine } from "./useDesignerEngine";

export const useLanguage = () => {
  const [lang, setLang] = useState<string>("zh-CN")
  const engine = useDesignerEngine()

  useEffect(()=>{
    const lang = engine?.getMonitor().getState().lang
    if(lang){
      setLang(lang)
    }
  }, [engine])

  useEffect(() => {
    const monitor = engine?.getMonitor()
    if (monitor) {
      const unsub = monitor.subscribeToLangeChange((lang) => {
        setLang(lang)
      })

      return unsub
    }
  }, [engine])
  return lang;
}

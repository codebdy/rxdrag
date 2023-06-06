import { IScriptControllerMeta } from "@rxdrag/minions-runtime-react"
import Editor from "@monaco-editor/react";
import { memo, useCallback, useEffect, useState } from "react"
import { useThemeMode } from "@rxdrag/react-core";


export const ScriptControllerSetter = memo((
  props: {
    value: IScriptControllerMeta,
    onChange?: (value?: IScriptControllerMeta) => void
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState("")
  const themeMode = useThemeMode();

  const handleChange = useCallback((script?: string) => {
    setInputValue(script||"");
  }, [])
  
  //缓存一下，解决性能问题
  useEffect(()=>{
    if(inputValue !== (value.script||"")){
      onChange?.({...value, script:inputValue})
    }
  }, [inputValue, onChange, value])

  return (
    <div style={{ flex: 1 }}>
      <Editor
        height="100%"
        language="javascript"
        theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
        value={inputValue || ""}
        options={{ lineNumbers: "off", glyphMargin: false }}
        onChange={handleChange}
      />
    </div>
  )
})
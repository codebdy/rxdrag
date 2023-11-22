import { memo, useEffect, useRef, useState } from "react"
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const MonacoEditor = memo((
  props: {
    width?: string | number,
    height?: string | number,
    value?: string,
    language?: string,
    onChange?: (value?: string) => void,
    options?: monaco.editor.IStandaloneEditorConstructionOptions,
  }
) => {
  const { width = "100%", height = "100%", value, language = "javascript", onChange, options } = props;
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl && monacoEl.current) {
      const editor = monaco.editor.create(monacoEl.current, {
        value: value,
        language: language,
        ...options,
      })
      setEditor(editor);
      return () => editor?.dispose();
    }
  }, [language, options, value]);

  // useEffect(()=>{
  //   editor?.onDidChangeModelContent(onChange)
  // },[])

  return <div style={{
    width,
    height,
  }} ref={monacoEl}></div>;
})
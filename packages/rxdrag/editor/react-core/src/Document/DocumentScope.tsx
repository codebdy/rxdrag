import { memo, useEffect, useRef, useState } from "react"
import { DocumentRoot } from ".";
import { IViewSchema } from "@rxdrag/schema";
import { ILocales } from "@rxdrag/locales";
import { IDocument } from "@rxdrag/core";
import { useDesignerEngine } from "../hooks";

export const DocumentScope = memo((
  props: {
    schema: IViewSchema,
    children?: React.ReactNode,
    locales?: ILocales,
  }
) => {
  const { schema, children, locales } = props;
  const [doc, setDoc] = useState<IDocument>()
  const engine = useDesignerEngine()
  const docRef = useRef<IDocument>()
  docRef.current = doc
  useEffect(() => {
    if (engine) {
      console.log("创建 document")
      if (docRef.current) {
        docRef.current.destroy()
        docRef.current = undefined
      }
      const document = engine.createDocument(schema)
      engine.getActions().changeActivedDocument(document.id)
      setDoc(document)
    }
  }, [engine, schema])

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  return (
    doc
      ? <DocumentRoot doc={doc}>
        {children}
      </DocumentRoot>
      : <></>
  )
})
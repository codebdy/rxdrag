import { memo, useState } from "react"
import { HistoryContext, HistoryRedords, MenuSchemaContext, defautHistory, ResourcesContext } from "./contexts";
import { menuResources } from "./resources";
import { IMenuSchema } from "./interfaces/schema";

export const DesignerRoot = memo((props: {
  children?: React.ReactNode,
}) => {
  const { children } = props;
  const menuSchemaState = useState<IMenuSchema>({ rootIds: [], items: [] })
  const historyState = useState<HistoryRedords>(defautHistory)

  return (
    <ResourcesContext.Provider value={menuResources}>
      <MenuSchemaContext.Provider value={menuSchemaState}>
        <HistoryContext.Provider value={historyState}>
          {children}
        </HistoryContext.Provider>
      </MenuSchemaContext.Provider>
    </ResourcesContext.Provider>
  )
})
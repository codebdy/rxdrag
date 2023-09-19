import { memo, useState } from "react"
import { ActiveIdContext, HistoryContext, HistoryRedords, MenuSchemaContext, defautHistory, ResourcesContext } from "./contexts";
import { menuResources } from "./resources";
import { Identifier } from "./dnd/types";
import { IMenuSchema } from "./interfaces/schema";

export const DesignerRoot = memo((props: {
  children?: React.ReactNode,
}) => {
  const { children } = props;
  const menuSchemaState = useState<IMenuSchema>({ rootIds: [], items: [] })
  const activeIdState = useState<Identifier | null>(null);
  const historyState = useState<HistoryRedords>(defautHistory)

  return (
    <ResourcesContext.Provider value={menuResources}>
      <MenuSchemaContext.Provider value={menuSchemaState}>
        <ActiveIdContext.Provider value={activeIdState}>
          <HistoryContext.Provider value={historyState}>
            {children}
          </HistoryContext.Provider>
        </ActiveIdContext.Provider>
      </MenuSchemaContext.Provider>
    </ResourcesContext.Provider>
  )
})
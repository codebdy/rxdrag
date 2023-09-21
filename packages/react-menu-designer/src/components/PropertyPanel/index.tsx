import { memo, useCallback } from "react";
import { DEFAULT_MARGIN } from "../../utilities";

import styled from 'styled-components';
import { ColumnTitle, FloatableColumn } from "../FloatableColumn";
import { useTranslate } from "@rxdrag/react-locales";
import { ID } from "@rxdrag/shared";
import { useResource } from "../../hooks/useResource";
import { useItem } from "../../hooks/useItem";
import { IConfig } from "../../interfaces";
import { useUpdateConfig } from "../../hooks/useUpdateConfig";
import { useMenuSchemaState } from "../../hooks/useMenuSchemaState";
import { useBackup } from "../../hooks/useBackup";

const maxWidth = 1000
const minWidth = 200

const PropertyPanelShell = styled(FloatableColumn)`
  right: ${DEFAULT_MARGIN}px;
`
const Content = styled.div`
  padding: 16px;
`

export const PropertyPanel = memo((props: {
  selectedId?: ID,
}) => {
  const { selectedId } = props
  const t = useTranslate()
  const item = useItem(selectedId)
  const resource = useResource(item?.meta)
  const updateConfig = useUpdateConfig(selectedId)
  const [menuSchema] = useMenuSchemaState()
  const backup = useBackup()

  const handleChange = useCallback((config: IConfig) => {
    backup(menuSchema)
    updateConfig(config)
  }, [backup, menuSchema, updateConfig])

  return (
    <PropertyPanelShell
      right
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        {t("properties")}
        {
          item?.meta.type && <>
            [
            {t(item?.meta.type)}
            ]
          </>
        }
      </ColumnTitle>
      <Content>
        {resource?.configSetter &&
          <resource.configSetter
            value={item?.meta.config as IConfig | undefined}
            onChange={handleChange}
          />
        }
      </Content>
    </PropertyPanelShell>
  )
})
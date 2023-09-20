import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";

import styled from 'styled-components';
import { ColumnTitle, FloatableColumn } from "../FloatableColumn";
import { useTranslate } from "@rxdrag/react-locales";
import { Identifier } from "../../dnd";
import { useResource } from "../../hooks/useResource";
import { useItem } from "../../hooks/useItem";

const maxWidth = 1000
const minWidth = 200

const PropertyPanelShell = styled(FloatableColumn)`
  right: ${DEFAULT_MARGIN}px;
`
const Content = styled.div`
  padding: 16px;
`

export const PropertyPanel = memo((props: {
  selectedId?: Identifier,
}) => {
  const { selectedId } = props
  const t = useTranslate()
  const item = useItem(selectedId)
  const resource = useResource(item?.meta.type)

  return (
    <PropertyPanelShell
      right
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        {t("properties")}
      </ColumnTitle>
      <Content>
        {resource?.configSetter && <resource.configSetter />}
      </Content>
    </PropertyPanelShell>
  )
})
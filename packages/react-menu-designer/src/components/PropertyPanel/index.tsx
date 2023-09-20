import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";

import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";
import { useTranslate } from "@rxdrag/react-locales";

const maxWidth = 1000
const minWidth = 200

const PropertyPanelShell = styled(FlatableColumn)`
  right: ${DEFAULT_MARGIN}px;
`
const Content = styled.div`
  padding: 16px;
`

export const PropertyPanel = memo(() => {
  const t = useTranslate()
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

      </Content>
    </PropertyPanelShell>
  )
})
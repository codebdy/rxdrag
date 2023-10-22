import React, { memo } from "react";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { Empty } from "antd";
import { useMetaId } from "../hooks/useMetaId";
import { useTranslate } from "@rxdrag/react-locales";
import { PropertyBox } from "../ModelBoard/PropertyBox";

export const PropertyPanel = memo(() => {
  const metaId = useMetaId();
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedEntity = useClass(selectedElement || "", metaId);

  const t = useTranslate();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    metaId
  );

  const relation = useRelation(selectedElement || "", metaId);

  return (
    attribute && attributeCls 
      ? <AttributePanel attribute={attribute} cls={attributeCls} />
      : <PropertyBox title={t("Properties")} >
        {selectedEntity && <ClassPanel cls={selectedEntity} />}
        {relation && <RelationPanel relation={relation} />}
        {!selectedElement && (
          <div style={{ padding: "16px" }}>
            <Empty />
          </div>
        )}
      </PropertyBox>
  );
});

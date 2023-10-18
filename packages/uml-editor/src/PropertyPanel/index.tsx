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
import { useTranslation } from "react-i18next";
import { PropertyBox } from "common/ModelBoard/PropertyBox";
import { useMetaId } from "../hooks/useMetaId";
import { useSelectedScriptLogic } from "UmlEditor/hooks/useSelectedScriptLogic";
import { ScriptPanel } from "./MethodPanel/ScriptPanel";
import { useSelectedApi } from "UmlEditor/hooks/useSelectedApi";
import { ApiPanel } from "./MethodPanel/ApiPanel";
import { useSelectedCode } from "UmlEditor/hooks/useSelectedCode";
import { CodePanel } from "./CodePanel";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";

export const PropertyPanel = memo(() => {
  const metaId = useMetaId();
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedEntity = useClass(selectedElement || "", metaId);
  const selecctedCode = useSelectedCode();
  const selectedScript = useSelectedScriptLogic();
  const selectedGraphLogic = useSelectedGraphLogic();
  const selectedApi = useSelectedApi();
  const { t } = useTranslation();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    metaId
  );

  const relation = useRelation(selectedElement || "", metaId);

  return (
    <PropertyBox title={t("UmlEditor.Properties")} >
      {selectedEntity && <ClassPanel cls={selectedEntity} />}
      {attribute && attributeCls && (
        <AttributePanel attribute={attribute} cls={attributeCls} />
      )}
      {relation && <RelationPanel relation={relation} />}
      {selectedScript && <ScriptPanel scriptLogic={selectedScript} />}
      {selectedApi && <ApiPanel api={selectedApi} />}
      {selecctedCode && <CodePanel code={selecctedCode} />}
      {!selectedElement && !selectedScript && !selectedGraphLogic && !selectedApi && !selecctedCode && (
        <div style={{ padding: "16px" }}>
          <Empty />
        </div>
      )}
    </PropertyBox>
  );
});

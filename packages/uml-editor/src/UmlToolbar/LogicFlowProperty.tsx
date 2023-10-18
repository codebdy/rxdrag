import { memo, useCallback, useState } from "react"
import { ToolbarButton } from ".";
import { FunctionOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";
import { GraphLogicPanel } from "UmlEditor/PropertyPanel/MethodPanel/GraphLogicPanel";

export const LogicFlowProperty = memo(() => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation()
  const selectedGraphLogic = useSelectedGraphLogic();
  const handleShowDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <ToolbarButton
        icon={<FunctionOutlined />}
        onClick={handleShowDrawer}
      ></ToolbarButton>
      <Drawer title={t("UmlEditor.LogicFlowProperty")} placement="right" onClose={handleClose} open={open}>
        {selectedGraphLogic && <GraphLogicPanel graphLogic={selectedGraphLogic} />}
      </Drawer>
    </>
  )
})
import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { FunctionOutlined } from "@ant-design/icons";
import { RootLabel } from "./RootLabel";
import { useAppFrontend } from "../../../../hooks/useAppFrontend";
import { useQueryFlows } from "../../../../hooks/useQueryFlows";
import { FxScope, LogicType } from "../../../../interfaces/flow";
import { useModule } from "../../../hooks/useModule";
import { FxLabel } from "./FxLabel";
import { ID } from "@rxdrag/shared";

const { DirectoryTree } = Tree;

export const FXes = memo((
  props: {
    display?: boolean,
    selected?: ID,
    onSelect: (id: ID) => void,
  }
) => {
  const { display, selected, onSelect } = props;
  const frontend = useAppFrontend()
  const module = useModule()

  const { flows: moduleFxes } = useQueryFlows(module?.id, LogicType.fx, FxScope.module)
  const { flows: deviceFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.device)
  const { flows: appFxes } = useQueryFlows(frontend?.app?.id, LogicType.fx, FxScope.app)

  const treeData: DataNode[] = useMemo(() => [
    {
      key: 'module',
      selectable: false,
      title: <RootLabel
        title="模块"
        scope={FxScope.module}
        ownerId={module?.id}
      />,
      children: moduleFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      key: 'device',
      selectable: false,
      title: <RootLabel
        title="设备端"
        scope={FxScope.device}
        ownerId={frontend?.app?.id}
      />,
      children: deviceFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      key: 'app',
      selectable: false,
      title: <RootLabel
        title="应用"
        scope={FxScope.app}
        ownerId={frontend?.app?.id}
      />,
      children: appFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
  ], [appFxes, deviceFxes, frontend?.app?.id, module?.id, moduleFxes]);

  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <TreeContainer
      className={!display ? "hidden" : undefined}
    >
      <DirectoryTree
        selectedKeys={[selected || ""]}
        onSelect={handleSelect}
        treeData={treeData}
      />
    </TreeContainer>
  )
})
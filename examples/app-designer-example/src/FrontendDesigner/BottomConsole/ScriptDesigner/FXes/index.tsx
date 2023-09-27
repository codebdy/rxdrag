import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { FunctionOutlined } from "@ant-design/icons";
import { RootLabel } from "./RootLabel";
import { useAppFrontend } from "../../../../hooks/useAppFrontend";
import { FxScope } from "../../../../interfaces/fx";
import { useModule } from "../../../hooks/useModule";
import { FxLabel } from "./FxLabel";
import { useQueryFxScripts } from "../../../../hooks/useQueryFxScripts";

const { DirectoryTree } = Tree;

export const FXes = memo(() => {
  const frontend = useAppFrontend()
  const module = useModule()
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const { fxScripts: moduleFxes } = useQueryFxScripts(FxScope.module, module?.id)
  const { fxScripts: deviceFxes } = useQueryFxScripts(FxScope.device, frontend?.app?.id)
  const { fxScripts: appFxes } = useQueryFxScripts(FxScope.app, frontend?.app?.id)

  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootLabel
        title="模块"
        scope={FxScope.module}
        ownerId={module?.id}
      />,
      key: 'module',
      children: moduleFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      title: <RootLabel
        title="设备端"
        scope={FxScope.device}
        ownerId={frontend?.app?.id}
      />,
      key: 'device',
      children: deviceFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      title: <RootLabel
        title="应用"
        scope={FxScope.app}
        ownerId={frontend?.app?.id}
      />,
      key: 'app',
      children: appFxes?.map(fx => {
        return ({
          key: fx.id,
          title: <FxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
  ], [appFxes, deviceFxes, frontend?.app?.id, module?.id, moduleFxes]);

  return (
    <TreeContainer>
      <DirectoryTree
        onSelect={onSelect}
        treeData={treeData}
      />
    </TreeContainer>
  )
})
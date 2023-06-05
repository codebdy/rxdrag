import { IControllerDefine } from "@rxdrag/react-antd-shell/src/types";
import { ShortcutControllerFactory } from "../ShortcutController";
import { LOGICFLOW_FACTORY_NAME, LogicFlowControllerFactory, SCRIPT_FACTORY_NAME, ScriptControllerFactory } from "@rxdrag/minions-runtime-react";
import { shortcutLocales } from "./locales/shortcut";
import { logicFlowLocales } from "./locales/logicflow";
import { scriptLocales } from "./locales/script";

export const controllerDefines: IControllerDefine[] = [
  {
    name: "shortcut",
    label: "$shortcut",
    factory: ShortcutControllerFactory,
    setter: () => <></>,
    locales: shortcutLocales,
  },
  {
    name: LOGICFLOW_FACTORY_NAME,
    label: "$logicFlow",
    factory: LogicFlowControllerFactory,
    setter: () => <></>,
    locales: logicFlowLocales,
  },
  {
    name: SCRIPT_FACTORY_NAME,
    label: "$script",
    factory: ScriptControllerFactory,
    setter: () => <></>,
    locales: scriptLocales,
  }

]
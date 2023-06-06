import { IControllerDefine } from "@rxdrag/react-antd-shell/src/types";
import { ShortcutControllerFactory } from "../ShortcutController";
import { LOGICFLOW_FACTORY_NAME, LogicFlowControllerFactory, SCRIPT_FACTORY_NAME, ScriptControllerFactory } from "@rxdrag/minions-runtime-react";
import { shortcutLocales } from "./locales/shortcut";
import { logicFlowLocales } from "./locales/logicflow";
import { scriptLocales } from "./locales/script";
import { ShortcutControllerSetter } from "./ShortcutControllerSetter";
import { LogicFlowControllerSetter, ScriptControllerSetter } from "@rxdrag/react-antd-shell";

export const controllerDefines: IControllerDefine[] = [
  {
    name: "shortcut",
    label: "$shortcut",
    factory: ShortcutControllerFactory,
    setter: ShortcutControllerSetter,
    locales: shortcutLocales,
  },
  {
    name: LOGICFLOW_FACTORY_NAME,
    label: "$logicFlow",
    factory: LogicFlowControllerFactory,
    setter: LogicFlowControllerSetter,
    locales: logicFlowLocales,
  },
  {
    name: SCRIPT_FACTORY_NAME,
    label: "$script",
    factory: ScriptControllerFactory,
    setter: ScriptControllerSetter,
    locales: scriptLocales,
  }

]
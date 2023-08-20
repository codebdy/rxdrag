import { IComponentConfig } from "@rxdrag/core";
import { ReactComponent} from "@rxdrag/react-shared";
import { ReactNode } from "react";

//export type ReactComponent = React.FC<any> | React.ComponentClass<any>

export type IComponentMaterial = IComponentConfig<ReactComponent, ReactNode>


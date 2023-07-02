import { AbstractActivity } from "@rxdrag/minions-runtime";
import { IActivityDefine } from "@rxdrag/minions-schema";
export declare enum MessageType {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning",
    Loading = "loading"
}
export interface IInfoMessageConfig {
    type?: MessageType;
    duration?: number;
}
export declare class InfoMessage extends AbstractActivity<IInfoMessageConfig> {
    static NAME: string;
    constructor(meta: IActivityDefine<IInfoMessageConfig>);
    inputHandler: (inputValue?: string | Error) => void;
}

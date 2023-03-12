import { INodeSchema } from "interfaces";
import { ILocales, ILocalesManager } from "interfaces/loacales";
export declare class LocalesManager implements ILocalesManager {
    private lang;
    locales: ILocales;
    constructor(lang: string);
    setLanguage(lang: string): void;
    getMessage(key: string): string | null;
    getResouceMessage(key: string): string | null;
    getComponentMessage(componentName: string, key: string): string | null;
    getToolsMessage(key: string): string | null;
    registerLocales(...locales: ILocales[]): void;
    registerResourceLocales(...locales: ILocales[]): void;
    registerComponentsLocales(...locales: ILocales[]): void;
    registerComponentLocales(componentName: string, locales: ILocales): void;
    registerToolsLocales(...locales: ILocales[]): void;
    translateDesignerSchema(componentName: string, schema: INodeSchema): INodeSchema;
    private translateObject;
    private translateArray;
    private translateString;
    private registerLocalesOnItem;
    private getValueByKey;
}

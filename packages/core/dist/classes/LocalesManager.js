import { isArr, isObj, isStr } from "utils/types";
import _ from "lodash";
export class LocalesManager {
    setLanguage(lang) {
        this.lang = lang;
    }
    getMessage(key) {
        return this.getValueByKey(this.locales[this.lang], key);
    }
    getResouceMessage(key) {
        var _this_locales_this_lang;
        const currenLocales = (_this_locales_this_lang = this.locales[this.lang]) === null || _this_locales_this_lang === void 0 ? void 0 : _this_locales_this_lang.resources;
        return this.getValueByKey(currenLocales || {}, key);
    }
    getComponentMessage(componentName, key) {
        var _this_locales_this_lang;
        const currenLocales = (_this_locales_this_lang = this.locales[this.lang]) === null || _this_locales_this_lang === void 0 ? void 0 : _this_locales_this_lang.components;
        return this.getValueByKey((currenLocales === null || currenLocales === void 0 ? void 0 : currenLocales[componentName]) || {}, key);
    }
    getToolsMessage(key) {
        var _this_locales_this_lang;
        const currenLocales = (_this_locales_this_lang = this.locales[this.lang]) === null || _this_locales_this_lang === void 0 ? void 0 : _this_locales_this_lang.tools;
        return this.getValueByKey(currenLocales || {}, key);
    }
    registerLocales(...locales) {
        this.locales = _.merge(this.locales, ...locales);
    }
    registerResourceLocales(...locales) {
        this.registerLocalesOnItem("resources", ...locales);
    }
    registerComponentsLocales(...locales) {
        this.registerLocalesOnItem("components", ...locales);
    }
    registerComponentLocales(componentName, locales) {
        for (const lang of Object.keys(locales)){
            if (!this.locales[lang]) {
                this.locales[lang] = {};
            }
            const currentlangLocales = this.locales[lang];
            if (!currentlangLocales.components) {
                currentlangLocales.components = {};
            }
            currentlangLocales.components[componentName] = locales[lang];
        }
    }
    registerToolsLocales(...locales) {
        this.registerLocalesOnItem("tools", ...locales);
    }
    translateDesignerSchema(componentName, schema) {
        return this.translateObject(componentName, schema);
    }
    translateObject(componentName, obj) {
        for (const key of Object.keys(obj)){
            if (isStr(obj[key])) {
                obj[key] = this.translateString(componentName, obj[key]);
            } else if (isObj(obj[key])) {
                obj[key] = this.translateObject(componentName, obj[key]);
            } else if (isArr(obj[key])) {
                obj[key] = this.translateArray(componentName, obj[key]);
            }
        }
        return obj;
    }
    translateArray(componentName, arr) {
        arr.forEach((item, index)=>{
            if (isStr(item)) {
                arr[index] = this.translateString(componentName, item);
            } else if (isObj(item)) {
                arr[index] = this.translateObject(componentName, item);
            } else if (isArr(item)) {
                arr[index] = this.translateArray(componentName, item);
            }
        });
        return arr;
    }
    translateString(componentName, str) {
        if (str.startsWith('$')) {
            const token = str.substring(1);
            return this.getMessage(token) || this.getToolsMessage(token) || this.getComponentMessage(componentName, "settings." + token) || str;
        }
        return str;
    }
    registerLocalesOnItem(item, ...locales) {
        for (const locale of locales){
            for (const lang of Object.keys(locale)){
                var _this_locales_lang;
                if (!this.locales[lang]) {
                    this.locales[lang] = {};
                }
                this.locales[lang][item] = _.merge(((_this_locales_lang = this.locales[lang]) === null || _this_locales_lang === void 0 ? void 0 : _this_locales_lang[item]) || {}, locale[lang]);
            }
        }
    }
    getValueByKey(locales, key) {
        const [subKey, ...others] = key.split(".");
        if (!(others === null || others === void 0 ? void 0 : others.length)) {
            return locales[subKey];
        } else {
            const valueByMergedKey = locales[key];
            //处理这种情况：Layout.Header
            if (valueByMergedKey) {
                return valueByMergedKey;
            }
            return this.getValueByKey(locales[subKey] || {}, others.join("."));
        }
    }
    constructor(lang){
        this.lang = lang;
        this.locales = {};
    }
}

//# sourceMappingURL=LocalesManager.js.map
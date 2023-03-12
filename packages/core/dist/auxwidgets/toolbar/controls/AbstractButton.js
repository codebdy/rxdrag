import { AUX_BACKGROUND_COLOR, AUX_COLOR, TOOLBAR_HEIGHT } from "auxwidgets/consts";
export class AbstractButton {
    selector(node, engine) {
        return true;
    }
    teardown() {
        if (this.htmlElement) {
            this.htmlElement.remove();
        }
    }
    createHtmlElement() {
        if (this.htmlElement) {
            this.htmlElement.remove();
        }
        const htmlDiv = document.createElement('div');
        htmlDiv.style.backgroundColor = AUX_BACKGROUND_COLOR;
        htmlDiv.style.color = AUX_COLOR;
        htmlDiv.style.borderRadius = "2px";
        htmlDiv.style.cursor = "pointer";
        htmlDiv.style.position = "relative";
        htmlDiv.style.display = "flex";
        htmlDiv.style.alignItems = "center";
        htmlDiv.style.justifyContent = "center";
        htmlDiv.style.marginLeft = "2px";
        htmlDiv.style.height = TOOLBAR_HEIGHT + "px";
        htmlDiv.style.width = TOOLBAR_HEIGHT + "px";
        htmlDiv.innerHTML = "?";
        this.htmlElement = htmlDiv;
        return htmlDiv;
    }
    constructor(name, engine){
        this.name = name;
        this.engine = engine;
        this.htmlElement = null;
    }
}

//# sourceMappingURL=AbstractButton.js.map
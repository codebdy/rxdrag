export const MARGIN_DECORATOR_NAME = "marginDecorator";
export class MarginDecorator {
    name = MARGIN_DECORATOR_NAME;
    decorate(el, node) {
        if (node.children && !node.meta?.locked) {
            el.classList.add("rx-node-margin");
        }
    }
    unDecorate(el) {
        el.classList.remove("rx-node-margin");
    }
}

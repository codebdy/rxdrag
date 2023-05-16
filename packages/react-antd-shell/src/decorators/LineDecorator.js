export const LINE_DECORTOR_NAME = "lineDecorator";
export class LineDecorator {
    name = LINE_DECORTOR_NAME;
    decorate(el, node) {
        el.classList.add("rx-node-outlined");
    }
    unDecorate(el) {
        el.classList.remove("rx-node-outlined");
    }
}

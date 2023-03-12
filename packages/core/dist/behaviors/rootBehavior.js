export const rootBehavior = {
    name: "default.root",
    selector: function(node) {
        return !node.parentId;
    },
    rule: {
        draggable: false,
        droppable: true,
        cloneable: false,
        deletable: false
    }
};

//# sourceMappingURL=rootBehavior.js.map
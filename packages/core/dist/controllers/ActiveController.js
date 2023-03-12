import { NodeType } from "core";
import { MouseOutEvent } from "shell/events/mouse/MouseOutEvent";
import { MouseOverEvent } from "shell/events/mouse/MouseOverEvent";
export class ActiveControllerImpl {
    destory() {
        this.unover();
        this.unout();
    }
    constructor(engine){
        this.engine = engine;
        this.name = "default.active-controller";
        this.handleOverNode = (e)=>{
            const { rxId , nodeType  } = e.data.targetRx || {};
            if (rxId && nodeType === NodeType.Node) {
                this.engine.getActions().activeNode(rxId);
            }
        };
        this.handleOutNode = (e)=>{
            this.engine.getActions().activeNode(null);
        };
        this.unover = engine.getShell().subscribeTo(MouseOverEvent, this.handleOverNode);
        this.unout = engine.getShell().subscribeTo(MouseOutEvent, this.handleOutNode);
    }
}
export const ActiveController = (engine)=>{
    return new ActiveControllerImpl(engine);
};

//# sourceMappingURL=ActiveController.js.map
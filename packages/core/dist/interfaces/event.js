import { isFn } from "utils/types";
import _ from "lodash";
export class EventEngine {
    dispatch(event, context) {
        let interrupted = false;
        for(const key in this.subscribers){
            if (isFn(this.subscribers[key])) {
                if (this.subscribers[key](event) === false) {
                    interrupted = true;
                }
            }
        }
        return interrupted ? false : true;
    }
    subscribeTo(type, subscriber) {
        return this.subscribe((event)=>{
            if (type && event instanceof type) {
                return subscriber(event);
            }
        });
    }
    subscribe(subscriber) {
        const id = _.uniqueId();
        if (isFn(subscriber)) {
            this.subscribers[id] = subscriber;
        }
        const unsubscribe = ()=>{
            this.unsubscribe(id);
        };
        return unsubscribe;
    }
    constructor(){
        this.subscribers = {};
        this.unsubscribe = (id)=>{
            if (this.subscribers[id]) {
                delete this.subscribers[id];
            }
        };
    }
}

//# sourceMappingURL=event.js.map
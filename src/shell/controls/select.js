import {RXComponent} from "../../basic/rxcomponent"
import {OpLabel} from "./label"

class SlectedList  extends RXComponent{
  constructor(list = {}){
    super('ul')
    this.cssClass('select-list')
    this.list = list

    for(var id in list){
      this.pushChild(new RXComponent('li')
                        .setInnerHTML(list[id])
                    )
    }
  }
}

export class OpSelect extends RXComponent{
  constructor(list = {}, selected = ''){
    super()
    this.cssClass('ctl-select')
    this.selected = selected
    this.valueViewer = new OpLabel()
    this.pushChild(this.valueViewer)
    this.list = new SlectedList(list)
    this.pushChild(this.list)
  }

}
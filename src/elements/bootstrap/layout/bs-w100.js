import {RXElement} from "../../rxelement"

export class BSW100 extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupLayout'
    this.toolboxInfo.elementId = 'bsw100'
    this.toolboxInfo.elementName = "Row Break"
    this.className = 'BSW100'
    this.label = "w-100"

    this.editMarginStyle.padding = '10px'
    this.widthDropMargin = 15;
    this.acceptedChildren=[]
  }

  make(){
    return new BSW100
  }

  /*toViewModel(){
    let model = super.toViewModel()
    model.classList.add('w-100')
    //model.classList.push.apply(model.classList, this.$meta.baseClass)
    //model.attributes.contentEditable = false
    return model
  }*/

  metaToModel(model){
    model.classList.add('w-100')
  }

}

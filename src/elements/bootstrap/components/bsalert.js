import {RXTextfieldable} from "../textfieldable"
//import {addonFigureCaption} from "../schemas/figure/figure-caption"

export class BSAlert extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsAlert'
    this.toolboxInfo.elementName = "Alert"
    this.className = 'BSAlert'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.groups.alertOptions = {
      label:'Alert Options'
    }
    this.$meta.tag = 'div'
    this.label = "alert"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    //addonFigureCaption(this)
  }

  make(){
    return new BSAlert
  }

}

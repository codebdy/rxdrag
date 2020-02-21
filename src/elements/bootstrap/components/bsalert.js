import {RXTextfieldable} from "../../html/textfieldable"
import {addonAlertContextual} from "../../schemas/components/alert/contextual"

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
    this.$meta.baseClass = 'alert' 
    this.label = "alert"
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    addonAlertContextual(this)
  }

  make(){
    return new BSAlert
  }

  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
  }

}

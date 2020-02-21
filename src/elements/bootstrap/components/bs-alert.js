import {RXTextfieldable} from "../../html/textfieldable"
import {HTMLSpan} from "../../html/html-span"
import {HTMLA} from "../../html/html-a"
import {BSCloseButton} from "./bs-close-button"
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
    this.$meta.role = 'alert' 
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
    model.attributes.role = this.$meta.role
  }

  loadConfig(){
    let span1 = new HTMLSpan().setInnerHTML('A simple primary alert with ')
    this.pushChild(span1)

    let link = new HTMLA()
               .setInnerHTML('an example link')
               .setField('alertLink', 'alert-link')
    this.pushChild(link)

    let span2 = new HTMLSpan().setInnerHTML('. Give it a click if you like.')
    this.pushChild(span2)

    this.pushChild(new BSCloseButton)

    this.setField('alertContextual', 'alert-primary')
    return this
  }

}

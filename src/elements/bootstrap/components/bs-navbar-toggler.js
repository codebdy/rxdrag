import {RXElement} from "../../rxelement"
import {HTMLSpan} from "../../html/html-span"
//import {addonClasses} from "../../schemas/general/classes"
//import {addonAttributes} from "../../schemas/general/attributes"


export class BSNavbarToggler extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarToggler'
    this.toolboxInfo.elementName = "Navbar Toggler"
    this.className = 'BSNavbarToggler'

    this.editMarginStyle.padding = '20px'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'navbarTogglerOptions',
      label:'Toggler Options',
    })

    this.meta.tag = 'button'
    this.label = "toggler"
    this.acceptedChildren=""
    this.addClass('navbar-toggler')

    //addonClasses(this).setDefaultValue(['navbar-toggler'])
    //addonAttributes(this)
  }

  make(){
    return new BSNavbarToggler
  }

  setCollapseId(collapseId){
    this.collapseId = collapseId
    return this
  }

  loadConfig(){
    this.pushChild( new HTMLSpan()
                    .addClass('navbar-toggler-icon')
                    .noTextField()
                    .setInnerHTML('')
                    .setEditPadding('')
                  )
    this.setAttribute('type','button')
    this.setAttribute('data-toggle','collapse')
    this.setAttribute('data-target',"#" + this.collapseId)
    return this
  }
}

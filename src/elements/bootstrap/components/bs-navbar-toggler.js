import {RXElement} from "../../rxelement"
import {HTMLA} from "../../html/html-a"
import {addonClasses} from "../../schemas/general/classes"
import {addonAttributes} from "../../schemas/general/attributes"


export class BSNavbarToggler extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarToggler'
    this.toolboxInfo.elementName = "Navbar Toggler"
    this.className = 'BSNavbarToggler'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.groups.navbarTogglerOptions = {
      label:'Toggler Options'
    }
    this.$meta.tag = 'button'
    this.label = "toggler"
    this.acceptedChildren=[]
    this.addClass('navbar-toggler')
    this.$meta.innerHTML = '<span class="navbar-toggler-icon"></span>'

    addonClasses(this).setDefaultValue(['navbar-toggler'])
    addonAttributes(this)
  }

  make(){
    return new BSNavbarToggler
  }

}

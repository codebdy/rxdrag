import {RXElement} from "../../rxelement"
import {HTMLA} from "../../html/html-a"


export class BSNavbarBrand extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarBrand'
    this.toolboxInfo.elementName = "NavbarBrand"
    this.className = 'BSNavbarBrand'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}

    this.groups.navbarBrandOptions = {
      label:'Brand Options'
    }
    this.label = "brand"
    this.acceptedChildren=''
    this.addClass('navbar-brand')
    this.$meta.innerHTML = "Brand"
  }

  make(){
    return new BSNavbarBrand
  }

}

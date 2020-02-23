import {RXElement} from "../../rxelement"
import {HTMLA} from "../../html/html-a"
import {addonClasses} from "../../schemas/general/classes"
import {addonAttributes} from "../../schemas/general/attributes"


export class BSNavbarBrand extends HTMLA{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarBrand'
    this.toolboxInfo.elementName = "Navbar Brand"
    this.className = 'BSNavbarBrand'

    this.editMarginStyle.padding = '20px'
    //this.editMarginStyle = {}

    this.groups.navbarBrandOptions = {
      label:'Brand Options'
    }
    this.label = "brand"
    this.acceptedChildren=''
    this.addClass('navbar-brand')
    this.$meta.innerHTML = "Brand"

    addonClasses(this).setDefaultValue(['navbar-brand'])
    addonAttributes(this)
  }

  make(){
    return new BSNavbarBrand
  }

}

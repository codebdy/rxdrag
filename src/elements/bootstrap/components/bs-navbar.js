import {HTMLNav} from "../../html/html-nav"
import {BSNavbarBrand} from "./bs-navbar-brand"
import {BSNavbarToggler} from "./bs-navbar-toggler"
import {BSNavbarCollapse} from "./bs-navbar-collapse"

 
//import {addonUtilPosition} from "../../schemas/utilities/position"
import contextualSchema from "../../schemas/components/navbar/contextual"
import expandSchema from "../../schemas/components/navbar/expand"
//import {addonHTMLId} from "../../schemas/general/id"

export class BSNavbar extends HTMLNav{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbar'
    this.toolboxInfo.elementName = "Navbar"
    this.className = 'BSNavbar'

    this.unshiftGroup({
      id:'navbarOptions',
      label:'Navbar Options',
    })

    //this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}
    this.label = 'navbar'

    this.acceptedChildren=''

    this.addClass('navbar')

    this.addSchema(contextualSchema, 'navbarOptions')
    this.addSchema(expandSchema, 'navbarOptions')
    this.addClass('navbar-expand-lg')
    this.addClass('navbar-light')
    this.brand = new BSNavbarBrand
    this.collapse = new BSNavbarCollapse()
    this.toggler = new BSNavbarToggler()
    this.forbidDuplicate = true
  }

  make(){
    return new BSNavbar
  }

  configSelf(){
    this.pushChild(this.brand)
    this.pushChild( 
      this.toggler
      .setCollapseId('collapse-' + this.id)
      .loadConfig()
    )
    this.pushChild(
      this.collapse
          .setCollapseId('collapse-' + this.id)
          .loadConfig()
    )
    return this
  }

  clone(){
    let copy = this.make()
    copy.brand = this.brand.clone()
    copy.collapse = this.collapse.clone()
    copy.toggler = this.toggler.clone()
    this.pushChild(copy.brand)
    this.pushChild(copy.toggler)
    this.pushChild(copy.collapse)
    return copy
  }

}

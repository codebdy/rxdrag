import {HTMLUl} from "../../html/html-ul"
import {HTMLSpan} from "../../html/html-span"
import {BSNavItem} from "./bs-nav-item"
import {BSNavLink} from "./bs-nav-link"
import {BSDropdown} from "./bs-dropdown"

export class BSNavbarNav extends HTMLUl{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbarNav'
    this.toolboxInfo.elementName = "NavbarNav"
    this.className = 'BSNavbarNav'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "navbar nav"
    this.addClass('navbar-nav')
    this.addClass('mr-auto')
  }

  make(){
    return new BSNavbarNav
  }

  configSelf(){
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .addClass('active')
        .setAttribute('href', '#')
        .pushChild(
          new HTMLSpan()
          .setInnerHTML('Home')
        )
        .pushChild(
          new HTMLSpan()
          .addClass('sr-only')
          .setInnerHTML('(current)')
        )
      )
    )
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .setInnerHTML('Link')
        .setAttribute('href', '#')
      )
    )
    this.pushChild(
      new BSDropdown()
      .addClass('nav-item')
      .setTag('li')
      .loadConfig()
    )
    this.pushChild(
      new BSNavItem()
      .pushChild(
        new BSNavLink()
        .setInnerHTML('Disabled')
        .setAttribute('href', '#')
      )
    )
  }

}


import {HTMLNav} from "../../html/html-nav"
import {BSPagination} from "./bs-pagination"

export class BSPaginationNav extends HTMLNav{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsPaginationNav'
    this.toolboxInfo.elementName = "Pagination"
    this.className = 'BSPaginationNav'
    this.acceptedChildren= ''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "pagination nav"
  }

  make(){
    return new BSPaginationNav
  }

  configSelf(){
    this.pushChild(new BSPagination().loadConfig())
  }

}


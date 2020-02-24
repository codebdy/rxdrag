import {BSContainer} from "./layout/bs-container"
import {BSRow} from "./layout/bs-row"
import {BSCol} from "./layout/bs-col"
import {BSW100} from "./layout/bs-w100"
import {BSHeading} from "./content/bs-heading"
import {BSParagraph} from "./content/bs-paragraph"
import {BSTable} from "./content/bs-table"
import {BSFigure} from "./content/bs-figure"

import {BSAlert} from "./components/bs-alert"
import {BSBadge} from "./components/bs-badge"
import {BSBreadcrumb} from "./components/bs-breadcrumb"
import {BSCloseButton} from "./components/bs-close-button"
import {BSButton} from "./components/bs-button"
import {BSButtonGroup} from "./components/bs-button-group"

import {BSNavbar} from "./components/bs-navbar"
import {BSNavbarBrand} from "./components/bs-navbar-brand"
import {BSNavbarToggler} from "./components/bs-navbar-toggler"


export default {
  container : new BSContainer().loadConfig(),
  row : new BSRow().loadConfig(),
  column : new BSCol().loadConfig(),
  w100 : new BSW100().loadConfig(),
  heading : new BSHeading().loadConfig(),
  paragraph : new BSParagraph().loadConfig(),
  table : new BSTable().loadConfig(),
  figure : new BSFigure().loadConfig(),
  alert : new BSAlert().loadConfig(),
  closeButton : new BSCloseButton().loadConfig(),
  badge : new BSBadge().loadConfig(),
  breadcrumb : new BSBreadcrumb().loadConfig(),
  button : new BSButton().loadConfig(),
  buttonGroup : new BSButtonGroup().loadConfig(),
  navbar : new BSNavbar().loadConfig(),
  navbarBrand : new BSNavbarBrand().loadConfig(),
  navbarToggler : new BSNavbarToggler().loadConfig(),
}
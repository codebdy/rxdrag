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


export default {
  container : new BSContainer,
  row : new BSRow,
  column : new BSCol,
  w100 : new BSW100,
  heading : new BSHeading,
  paragraph : new BSParagraph,
  table : new BSTable,
  figure : new BSFigure,
  alert : new BSAlert,
  closeButton : new BSCloseButton,
  badge : new BSBadge,
  breadcrumb : new BSBreadcrumb,
  button : new BSButton,
  buttonGroup : new BSButtonGroup,
  navbar : new BSNavbar,
  navbarBrand : new BSNavbarBrand,
}
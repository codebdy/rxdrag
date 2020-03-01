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

import {BSFormGroup} from "./form/bs-form-group"
import {BSInputGroup} from "./form/bs-input-group"
import {BSTextareaGroup} from "./form/bs-textarea-group"

import {BSCard} from "./components/bs-card"
import {BSCardHeader} from "./components/bs-card-header"
import {BSCardBody} from "./components/bs-card-body"
import {BSCardFooter} from "./components/bs-card-footer"
import {BSCardImage} from "./components/bs-card-image"
import {BSCardTitle} from "./components/bs-card-title"
import {BSCardText} from "./components/bs-card-text"
import {BSCardLink} from "./components/bs-card-link"

import {BSCarousel} from "./components/bs-carousel"
import {BSCarouselCaption} from "./components/bs-carousel-caption"

//暂缓实现
//import {BSAccordion} from "./components/bs-accordion"

import {BSDropdown} from  "./components/bs-dropdown"

import {BSJumbotron} from  "./components/bs-jumbotron"

import {BSListGroup} from "./components/bs-list-group"
import {BSListGroupItem} from "./components/bs-list-group-item"

import {BSNav} from "./components/bs-nav"
import {BSNavItem} from "./components/bs-nav-item"
import {BSNavLink} from "./components/bs-nav-link"

import {BSNavbar} from "./components/bs-navbar"
import {BSNavbarBrand} from "./components/bs-navbar-brand"
import {BSNavbarToggler} from "./components/bs-navbar-toggler"

import {BSPaginationNav} from "./components/bs-pagination-nav"

import {BSPopover} from "./components/bs-popover"
import {BSProgress} from "./components/bs-progress"

export default {
  container : new BSContainer(),
  row : new BSRow(),
  column : new BSCol(),
  w100 : new BSW100(),
  heading : new BSHeading(),
  paragraph : new BSParagraph(),
  table : new BSTable(),
  figure : new BSFigure(),
  alert : new BSAlert(),
  closeButton : new BSCloseButton(),
  badge : new BSBadge(),
  breadcrumb : new BSBreadcrumb(),
  button : new BSButton(),
  buttonGroup : new BSButtonGroup(),
  formGroup : new BSFormGroup(),
  inputGroup : new BSInputGroup(),
  textareaGroup : new BSTextareaGroup(),

  card : new BSCard,
  cardHeader : new BSCardHeader,
  cardBody : new BSCardBody,
  cardFooter : new BSCardFooter,
  cardImage : new BSCardImage,
  cardTitle : new BSCardTitle,
  cartText: new BSCardText,
  cardLink : new BSCardLink,

  carousel : new BSCarousel,
  carouselCaption :  new BSCarouselCaption,

  dropdown : new BSDropdown,

  jumbotron : new BSJumbotron,

  listGroup : new BSListGroup,
  listGroupItem : new BSListGroupItem,
  nav : new BSNav,
  navItem : new BSNavItem,
  navLink : new BSNavLink,
  
  navbar : new BSNavbar(),
  navbarBrand : new BSNavbarBrand(),
  navbarToggler : new BSNavbarToggler(),

  paginationNav : new BSPaginationNav(),
  popover : new BSPopover(),

  progress : new BSProgress(),
}
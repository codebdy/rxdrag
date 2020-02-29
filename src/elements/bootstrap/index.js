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
import {BSCarouselItem} from "./components/bs-carousel-item"

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
  navbar : new BSNavbar(),
  navbarBrand : new BSNavbarBrand(),
  navbarToggler : new BSNavbarToggler(),
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
  carouselItem :  new BSCarouselItem,
}
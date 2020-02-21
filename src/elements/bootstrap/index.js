import {BSContainer} from "./layout/bs-container"
import {BSRow} from "./layout/bs-row"
import {BSCol} from "./layout/bs-col"
import {BSW100} from "./layout/bs-w100"
import {BSHeading} from "./content/bs-heading"
import {BSParagraph} from "./content/bs-paragraph"
import {BSTable} from "./content/bs-table"
import {BSFigure} from "./content/bs-figure"

import {BSAlert} from "./components/bs-alert"

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
}
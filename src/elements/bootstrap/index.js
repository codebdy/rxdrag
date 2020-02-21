import {BSContainer} from "./layout/bscontainer"
import {BSRow} from "./layout/bsrow"
import {BSCol} from "./layout/bscol"
import {BSW100} from "./layout/bsw100"
import {BSHeading} from "./content/bsheading"
import {BSParagraph} from "./content/bsparagraph"
import {BSTable} from "./content/bstable"
import {BSFigure} from "./content/bsfigure"

import {BSAlert} from "./components/bsalert"

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
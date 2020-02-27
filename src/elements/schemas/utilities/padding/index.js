import paddingAll from "./padding-all"
import paddingH from "./padding-h"
import paddingV from "./padding-v"
import paddingTop from "./padding-t"
import paddingBottom from "./padding-b"
import paddingLeft from "./padding-l"
import paddingRight from "./padding-r"

export default{
  fieldName:'classList',
  label:'Padding',
  isRowGroup:true,
  fields:[
    paddingAll,
    paddingH,
    paddingV,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  ]
}
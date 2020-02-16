import paddingAll from "./padding-all"
import paddingH from "./padding-h"
import paddingV from "./padding-v"
import paddingTop from "./padding-t"
import paddingBottom from "./padding-b"
import paddingLeft from "./padding-l"
import paddingRight from "./padding-r"

export default{
  group:'utilities',
  label:'Padding',
  isRowGroup:true,
  fields:{
  	all : paddingAll,
  	horizontal : paddingH,
  	vertical : paddingV,
  	top : paddingTop,
  	bottom : paddingBottom,
  	left : paddingLeft,
  	right : paddingRight,
  }
}
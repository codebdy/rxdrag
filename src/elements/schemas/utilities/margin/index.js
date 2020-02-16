import marginAll from "./margin-all"
import marginH from "./margin-h"
import marginV from "./margin-v"
import marginTop from "./margin-t"
import marginBottom from "./margin-b"
import marginLeft from "./margin-l"
import marginRight from "./margin-r"

export default{
  group:'utilities',
  label:'Margin',
  isRowGroup:true,
  fields:{
  	all : marginAll,
  	horizontal : marginH,
  	vertical : marginV,
  	top : marginTop,
  	bottom : marginBottom,
  	left : marginLeft,
  	right : marginRight,
  }
}
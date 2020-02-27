import marginAll from "./margin-all"
import marginH from "./margin-h"
import marginV from "./margin-v"
import marginTop from "./margin-t"
import marginBottom from "./margin-b"
import marginLeft from "./margin-l"
import marginRight from "./margin-r"

export default {
  fieldName:'classList',
  label:'Margin',
  isRowGroup:true,
  fields:[
    marginAll,
    marginH,
    marginV,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  ]
}


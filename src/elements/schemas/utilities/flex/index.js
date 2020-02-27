import alignContent from "./align-content"
import alignItems from "./align-items"
import alignSelf from "./align-self"
import direction from "./direction"
import display from "./display"
import fill from "./fill"
import grow from "./grow"
import justifyContent from "./justify-content"
import marginAuto from "./margin-auto"
import order from "./order"
import shrink from "./shrink"
import wrap from "./wrap"

export default{
  fieldName:'classList',
  label:'Flex',
  isRowGroup:true,
  fields:[
    display,
    direction,
    justifyContent,
    alignItems,
    alignSelf,
    fill,
    grow,
    shrink,
    marginAuto,
    wrap,
    order,
    alignContent,
  ]
}
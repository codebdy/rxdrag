import addBorder from "./add"
import removeBorder from "./remove"
import borderColor from "./color"
import borderRadius from "./radius"

export default{
  fieldName:'classList',
  label:'Border',
  isRowGroup:true,
  fields:[borderColor,addBorder,removeBorder,borderRadius]
}


import {OptionFragment} from "../../option-fragment"
import justify from "./justify"
import align from "./align"
import wrapping from "./wrapping"
import truncate from "./truncate"
import wordBreak from "./word-break"
import transform from "./transform"
import weight from "./weight"
import italics from "./italics"
import monospace from "./monospace"
import resetColor from "./reset-color"
import decoration from "./decoration"


export default{
  fieldName:'classList',
  label:'Text',
  isRowGroup:true,
  fields:{
    justify : justify,
    align : align,
    wrapping : wrapping,
    truncate : truncate,
    wordBreak : wordBreak,
    transform : transform,
    weight : weight,
    italics : italics,
    monospace : monospace,
    resetColor : resetColor,
    decoration : decoration,
  }
}
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


var utilTextSchema = {
  group:'utilities',
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


class UtilText extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilTextSchema)

    this.fieldName = 'utilText'
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName] ? meta[this.fieldName] : {}
    model.classList.add(metaFragment.justify)
    super.responsiveMetaFieldToViewModel(model, metaFragment.align)
    model.classList.add(metaFragment.wrapping)
    model.classList.add(metaFragment.truncate)
    model.classList.add(metaFragment.wordBreak)
    model.classList.add(metaFragment.transform)
    model.classList.add(metaFragment.weight)
    model.classList.add(metaFragment.italics)
    model.classList.add(metaFragment.monospace)
    model.classList.add(metaFragment.resetColor)
    model.classList.add(metaFragment.decoration)
  }
}

var addonUtilText = (node, groupName)=>{
  let utilText = new UtilText
  utilText.addon(node, groupName)
  return utilText
}

export {addonUtilText}


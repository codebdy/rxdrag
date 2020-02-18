import {OptionFragment} from "../../option-fragment"
import responsiveMeta from "../../responsive"
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

var utilTextMeta = {
  justify : '',
  align : Object.assign({}, responsiveMeta),
  wrapping : '',
  truncate : '',
  wordBreak : '',
  transform : '',
  weight : '',
  italics : '',
  monospace : '',
  resetColor : '',
  decoration : '',

}

class UtilText extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilTextSchema)

    this.metaFragment = Object.assign({}, utilTextMeta) 

    this.fieldName = 'utilText'
  }

  copyMeta(from, to){
    to[this.fieldName] = {}
    to[this.fieldName].justify = from[this.fieldName].justify
    super.copyResponsiveMetaTo(from[this.fieldName].align, to[this.fieldName].align)
    to[this.fieldName].wrapping = from[this.fieldName].wrapping
    to[this.fieldName].truncate = from[this.fieldName].truncate
    to[this.fieldName].wordBreak = from[this.fieldName].wordBreak
    to[this.fieldName].transform = from[this.fieldName].transform
    to[this.fieldName].weight = from[this.fieldName].weight
    to[this.fieldName].italics = from[this.fieldName].italics
    to[this.fieldName].monospace = from[this.fieldName].monospace
    to[this.fieldName].resetColor = from[this.fieldName].resetColor
    to[this.fieldName].decoration = from[this.fieldName].decoration

  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
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


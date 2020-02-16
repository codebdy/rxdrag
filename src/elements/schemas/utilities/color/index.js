import textColor from "./text"
import backgroundColor from "./background"

var utilColorSchema = {
  group:'utilities',
  label:'Color',
  isRowGroup:true,
  fields:{
    textColor : textColor,
    backgroundColor : backgroundColor,
  }
}

var utilColorMeta = {
  textColor : '',
  backgroundColor : '',
}

var utilColorCopyTo = (from, to)=>{
  to.textColor = from.textColor
  to.backgroundColor = from.backgroundColor
}

var utilColorToViewModel = (model, metaFragment)=>{

  model.classList.add(metaFragment.textColor)
  model.classList.add(metaFragment.backgroundColor)
}

export{utilColorSchema, utilColorMeta, utilColorCopyTo, utilColorToViewModel}

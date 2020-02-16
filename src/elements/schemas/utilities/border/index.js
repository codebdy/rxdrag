import addBorder from "./add"
import removeBorder from "./remove"
import borderColor from "./color"
import borderRadius from "./radius"

var utilBorderSchema = {
  group:'utilities',
  label:'Border',
  isRowGroup:true,
  fields:{
    addBorder : addBorder,
    removeBorder : removeBorder,
    borderColor : borderColor,
    borderRadius : borderRadius,
  }
}

var utilBorderMeta = {
  addBorder : [],
  removeBorder : [],
  borderColor : '',
  borderRadius : '',
}

var utilBorderCopyTo = (from, to)=>{
  to.addBorder = from.addBorder.concat()
  to.removeBorder = from.removeBorder.concat()
  to.borderColor = from.borderColor
  to.borderRadius = from.borderRadius
}

var utilBorderToViewModel = (model, metaFragment)=>{
  if(metaFragment){
    model.classList.push.apply(model.classList, metaFragment.addBorder)
    model.classList.push.apply(model.classList, metaFragment.removeBorder)

    model.classList.add(metaFragment.borderColor)
    model.classList.add(metaFragment.borderRadius)
  }
}

export{utilBorderSchema, utilBorderMeta, utilBorderCopyTo, utilBorderToViewModel}

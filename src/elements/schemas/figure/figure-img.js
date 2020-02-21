import {OptionFragment} from "../option-fragment"

class FigureImg extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Figure Image',
      widget:'OpSwitch',
      group:'figureOptions',
      onValue:'figure-img',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'figureImg'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonFigureImg = (node, groupName)=>{
  let figureImg = new FigureImg
  figureImg.addon(node, groupName)
  return figureImg
}

export {addonFigureImg}


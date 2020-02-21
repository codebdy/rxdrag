import {OptionFragment} from "../option-fragment"

class FigureCaption extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Figure Caption',
      widget:'OpSwitch',
      group:'figureOptions',
      onValue:'figure-caption',
      offValue:'',
      defaultValue:'figure-caption',
    }

    this.metaFragment = 'figure-caption' 

    this.fieldName = 'figureCaption'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonFigureCaption = (node, groupName)=>{
  let figureCaption = new FigureCaption
  figureCaption.addon(node, groupName)
  return figureCaption
}

export {addonFigureCaption}


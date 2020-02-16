import {ObjectState} from "../basic/object-state"

export class CanvasState extends ObjectState{
  constructor(){
    super()
    this.__screenWidth = 'md'
    this.__preview = false
    this.__showEditMargin = true
    this.__showOutline = true
    this.__showLabel = true

  }

  get screenWidth(){
    return this.__screenWidth
  }

  set screenWidth(screenWidth){
    if(this.__screenWidth == screenWidth){return} 
    this.__screenWidth = screenWidth
    this.distributeEvent('screenWidth')
  }


  get preview(){
    return this.__preview
  }

  set preview(preview){
    if(this.__preview == preview){return} 
    this.__preview = preview
    this.distributeEvent('preview')
  }

  get showEditMargin(){
    return this.__showEditMargin
  }

  set showEditMargin(showEditMargin){
    if(this.__showEditMargin == showEditMargin){return} 
    this.__showEditMargin = showEditMargin
    this.distributeEvent('showEditMargin')
  }

  get showOutline(){
    return this.__showOutline
  }

  set showOutline(showOutline){
    if(this.__showOutline == showOutline){return} 
    this.__showOutline = showOutline
    this.distributeEvent('showOutline')
  }

  get showLabel(){
    return this.__showLabel
  }

  set showLabel(showLabel){
    if(this.__showLabel == showLabel){return} 
    this.__showLabel = showLabel
    this.distributeEvent('showLabel')
  }

}

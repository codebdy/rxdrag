import {RXComponent} from "../../basic/rxcomponent"

export class RXModel extends RXComponent{
  constructor(){
    super()
    this.cssClass('rx-model-mask')
    this.domOn('click',()=>{
          this.hide()
        })
    this.hide()

    this.content = new RXComponent

    this.content.cssClass('rx-model-conent')
        .domOn('click',(event)=>{
          event.stopPropagation()
        })

    this.pushChild(this.content)
  }

  setContent(contentHtml){
    this.content.setInnerHTML(contentHtml)
    return this
  }
}
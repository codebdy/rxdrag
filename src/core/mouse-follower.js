import {RXComponent} from "../basic/rxcomponent"

export class MouseFollower extends RXComponent{
  constructor(){
    super()
    this.cssClass('mouse-follower')
    this.hide()
  }

  active(text){
    super.setInnerHTML(text)
    this.isActived = true
  }

  hide(){
    this.isActived = false
    super.hide()
  }

  followMouse(event){
    this.$dom.style.left =  event.clientX
    this.$dom.style.top =  event.clientY
    super.show()
  }
}
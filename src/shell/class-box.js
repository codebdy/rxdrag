import {RXComponent} from "../basic/rxcomponent"

export class ClassBox extends RXComponent{
  constructor(){
    super()
    this.cssClass('bottom-view')
    this.pushChild(
      new RXComponent()
      .cssClass('view-header')
      .setInnerHTML('Over View')
    )
    this.pushChild(
      new RXComponent()
      .cssClass('view-body')
      .pushChild(
        new RXComponent()
        .cssClass('view-content')
        //.pushChild(rootNode)
      )
    )

  }
}
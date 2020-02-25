import {RXComponent} from "../basic/rxcomponent"


class TreeNode extends RXComponent{
  constructor(){
    super()
    this.cssClass('tree-node')

    this.nodeBody = new RXComponent()
                    .cssClass('tree-node-body')

    let titleIcon = new RXComponent()
                    .cssClass('title-icon')
                    .domOn('click', ()=>{
                      this.tongle('open')
                    })
                    //.setInnerHTML('△')
    let titleText = new RXComponent()
                    .cssClass('title-text')
                    .setInnerHTML('html')
    this.nodeTitle = new RXComponent()
                    .cssClass('tree-node-title')
                    .pushChild(titleIcon)
                    .pushChild(titleText)
                    

    this.pushChild(this.nodeTitle)
    this.pushChild(this.nodeBody)
  }

  add(node){
    this.nodeBody.pushChild(node)
    return this
  }
}

export class NodeTree extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-tree-box')
    this.pushChild(
      new RXComponent()
      .cssClass('tree-header')
    )
    let rootNode = new TreeNode().add(
          new TreeNode().add(new TreeNode().cssClass('leaf'))
        )
    this.pushChild(
      new RXComponent()
      .cssClass('tree-body')
      .pushChild(
        new RXComponent()
        .cssClass('tree-content')
        .pushChild(rootNode)
      )
    )
  }
}

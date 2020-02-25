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
    this.titleText = new RXComponent()
                    .cssClass('title-text')
                    
    this.nodeTitle = new RXComponent()
                    .cssClass('tree-node-title')
                    .pushChild(titleIcon)
                    .pushChild(this.titleText)
                    

    this.pushChild(this.nodeTitle)
    this.pushChild(this.nodeBody)
  }

  title(title){
    this.titleText.setInnerHTML(title)
    return this
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
      .setInnerHTML('<i class="fa fa-sitemap" style="transform:rotate(-90deg)" title="Elements View"></i>')
    )

    let rootNode = new TreeNode()
                   .title('html')
                   .cssClass('disable')
                   .add(
                     new TreeNode()
                     .title('body')
                     .cssClass('disable')
                     .add(
                       new TreeNode()
                       .cssClass('leaf')
                       .title('div')
                      )
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

    this.assembleTreeView = (nodes)=>{
      console.log(nodes)
    }
  }
}

import {RXComponent} from "../basic/rxcomponent"


class TreeNode extends RXComponent{
  constructor(schema){
    super()
    this.schema = schema
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

    if(schema){
      let title = schema.tag
      if(schema.label !== schema.tag){
        title = schema.tag + "(" + schema.label + ")"
      }
      this.title(title)
      this.cssClass('leaf')
      if(schema.state === 'focusedState'){
        this.cssClass('focused')
      }
      if(schema.children.length > 0){
        this.removeCssClass('leaf')
        this.loadChildren(schema.children)
      }
    }

  }

  title(title){
    this.titleText.setInnerHTML(title)
    return this
  }

  add(node){
    this.nodeBody.pushChild(node)
    return this
  }

  loadChildren(schemas){
    if(!schemas) return

    schemas.forEach((schema)=>{
      this.add(new TreeNode(schema))
    })
    if(this.nodeBody.$dom){
      this.nodeBody.refresh()
    }
  }

  focuseNode(node){
    if(this.schema && node.id == this.schema.id){
      this.cssClass('focused')
    }
    else{
      this.removeCssClass('focused')
    }

    this.nodeBody.children.forEach((child)=>{
      child.focuseNode(node)
    })
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

    this.bodyNode = new TreeNode()
                     .title('body')
                     .cssClass('disable')

    let rootNode = new TreeNode()
                   .title('html')
                   .cssClass('disable')
                   .add(this.bodyNode )
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
      this.bodyNode.loadChildren(nodes)
    }
  }

  focusNode(node){
    this.bodyNode.focuseNode(node)
  }
}

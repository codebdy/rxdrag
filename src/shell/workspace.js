import {RXComponent} from "../basic/rxcomponent"

export class Workspace extends RXComponent{
  constructor(config){
    super()
    this.config = config
    this.cssClass('rx-workspace')
    this.domAttr('id', "workspace")
  }

  render(parentElement){
    super.render(parentElement)

    let iframe = document.createElement('iframe')
    this.iframe = iframe
    iframe.src="javascript:0"
    iframe.frameBorder="0"
    iframe.border="0"
    iframe.allowTransparency="no"
    iframe.scrolling = "auto"
    iframe.height = "100%"
    this.$dom.appendChild(iframe)

    //this.loadTheme()
    return this
  }

  loadTheme(theme){
    let iframedocument =  this.iframe.contentDocument;
    let styleLinks = ''
    theme.cssFiles.forEach((linkFile)=>{
      styleLinks +=`<link href="${linkFile}" rel="stylesheet" type="text/css">`
    })
    let jsLinks = ''
    theme.jsFiles.forEach((linkFile)=>{
      jsLinks +=`<script src="${linkFile}"></script>`
    })

    let iframeContent = `
        <html style="width:100%;height:100%;">
          <head>
            <title>RXEditor Workspace</title>
            ${styleLinks}
            <link rel=stylesheet href="${this.config.mainCss}">
          </head>
          <body id="page-top" style="background-color:#FFF;padding:0;width:100%; height:100%;">
            <div id="canvas"></div>
            ${jsLinks}
            <script type="text/javascript" src="${this.config.mainJs}"></script>
            <script>
              creatEditorCore()
              rxEditor.hangOn('canvas', new RXEditorCommandProxy);
            </script>
            <script>
            $(function () { 
              $("[data-toggle='popover']").popover();
            });
            </script>
          </body>
        </html>
      `
    iframedocument.open();
    iframedocument.write(iframeContent);
    iframedocument.close();
  }

  resizeScreen(size){
    if(size == 'xl'){
      this.iframe.width="100%"
    }
    if(size == 'lg'){
      this.iframe.width="1199px"
    }
    if(size == 'md'){
      this.iframe.width="991px"
    }
    if(size == 'sm'){
      this.iframe.width="767px"
    }
    if(size == 'xs'){
      this.iframe.width="575"
    }
  }

}


export class Config{
  constructor(pageId){
    this.styles = []
    this.javascript = []
    this.bootstrapCss = "vendor/bootstrap-4.4.1-dist/css/bootstrap.min.css"
    this.jquery = "vendor/jquery/jquery-3.4.1.min.js"
    this.bootstrapJs = "vendor/bootstrap-4.4.1-dist/js/bootstrap.bundle.js"
    this.fontAwesome = "vendor/fontawesome-free/css/all.min.css"
    this.pageId = pageId
  }

  getCssFilesString(){
    let filesStr = ""
    this.styles.forEach(file=>{
      if(file.locked){
        filesStr = filesStr + `<link href="${file.path}" rel="stylesheet"> `
      }
    })

    return filesStr
  }

  getJsFilesString(){
    let filesStr = ""
    this.javascript.forEach(file=>{
      if(file.locked){
        filesStr = filesStr + `<script type="text/javascript" src="${file.path}"/><\/script> `
      }
    })

    return filesStr
  }

  getCanvasHtml(){
    return `<html style="width:100%;height:100%;">
            <head>
              <title>RXEditor Workspace</title>
              <link href="${this.bootstrapCss}" rel="stylesheet">
              <link href="${this.fontAwesome}" rel="stylesheet">
              ${this.getCssFilesString()}
              <link href="style/rxeditor.css" rel="stylesheet">
            </head>
            <body id="page-top" style="background-color:#FFF;padding:0;width:100%; height:100%;">
              <div id="canvas"></div>
              <script type="text/javascript" src="${this.jquery}"/><\/script>
              <script type="text/javascript" src="${this.bootstrapJs}"/><\/script>
              ${this.getJsFilesString()}
              <script type="text/javascript" src="dist/core.js"/><\/script>
              <script>
                creatEditorCore(${this.pageId})
                rxEditor.hangOn('canvas');
              <\/script>
            </body>
          </html>
        `
  }

  getPreviewHtml(code){
    let cssBlocks = ""
    this.styles.forEach(file=>{
      if(!file.locked){
        cssBlocks = cssBlocks + `<style type="text/css">${file.code}<\/style>`
      }
    })

    let jsBlocks = ""
    this.javascript.forEach(file=>{
      if(!file.locked){
        jsBlocks = jsBlocks + `<script type="text/javascript">${file.code}<\/script>`
      }
    })

    return this.getCommonHtml(code, cssBlocks, jsBlocks)
  }

  getRealHtml(code){
    let cssBlocks = ""
    this.styles.forEach(file=>{
      if(!file.locked){
        cssBlocks = cssBlocks + ` <link href="css/${file.name}" rel="stylesheet">`
      }
    })

    let jsBlocks = ""
    this.javascript.forEach(file=>{
      if(!file.locked){
        jsBlocks = jsBlocks + `<script src="js/${file.name}"><\/script>`
      }
    })
    return this.getCommonHtml(store, code, cssBlocks, jsBlocks, '')
  }

  getCommonHtml(code, cssBlocks, jsBlocks, previewCode ='<link href="style/rxpage-preview.css" rel="stylesheet">'){
    return `<html>
            <head>
              <title>RXEditor Workspace</title>
              <link href="${this.bootstrapCss}" rel="stylesheet">
              <link href="${this.fontAwesome}" rel="stylesheet">
              ${previewCode}
              ${this.getCssFilesString()}
              ${cssBlocks}
            </head>
            <body>
              ${code}
              <script type="text/javascript" src="${this.jquery}"/><\/script>
              <script type="text/javascript" src="${this.bootstrapJs}"/><\/script>
              ${this.getJsFilesString()}
              ${jsBlocks}
            </body>
          </html>
        `
  }


}
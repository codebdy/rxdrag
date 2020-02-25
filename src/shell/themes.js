
let themes = {
  base:{
    cssFiles:[
      'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      'style/rxeditor.css',
      'style/font-awesome-4.7.0/css/font-awesome.min.css',
    ],
    jsFiles:[
    ],
  },
  agency : {
    id:'agency',
    cssFiles:[
      'themes/agency/vendor/bootstrap/css/bootstrap.min.css',
      'themes/agency/vendor/fontawesome-free/css/all.min.css',
      'style/font-awesome-4.7.0/css/font-awesome.min.css',
      'https://fonts.googleapis.com/css?family=Montserrat:400,700',
      'https://fonts.googleapis.com/css?family=Kaushan+Script',
      'https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic',
      'https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700',
      'themes/agency/css/agency.min.css',
    ],
    jsFiles:[
      'themes/agency/vendor/jquery/jquery.min.js',
      'themes/agency/vendor/bootstrap/js/bootstrap.bundle.min.js',
      'themes/agency/vendor/jquery-easing/jquery.easing.min.js',
      'themes/agency/js/jqBootstrapValidation.js',
      'themes/agency/js/contact_me.js',
      //'themes/agency/js/agency.min.js',
    ],

    uiBlocks:[
      {
        toolboxInfo:{
          //groupId : 'groupThemUI',
          elementId : 'navbar',
          elementName : "Navbar",
        },
        
        json:`
        {"name":"BSNavbar","meta":{"tag":"nav","classList":["navbar"],"styles":{},"attributes":{},"navbarContextual":"navbar-dark","navbarExpand":{"xs":"","sm":"","md":"","lg":"navbar-expand-lg","xl":""},"htmlId":"mainNav"},"children":[{"name":"BSNavbarBrand","meta":{"tag":"a","classList":["navbar-brand","js-scroll-trigger"],"styles":{},"attributes":{},"innerHTML":"Brand","generalTextfield":"contentEditable","aHref":"#","aTarget":"","generalTitle":"","alertLink":""},"children":[]},{"name":"BSNavbarToggler","meta":{"tag":"button","classList":["navbar-toggler"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Menu&nbsp;","generalTextfield":"contentEditable","utilColor":{"textColor":"","backgroundColor":""},"utilBorder":{"addBorder":[],"removeBorder":[],"borderColor":"","borderRadius":""},"utilMargin":{"all":{"xs":"","sm":"","md":"","lg":"","xl":""},"horizontal":{"xs":"","sm":"","md":"","lg":"","xl":""},"vertical":{"xs":"","sm":"","md":"","lg":"","xl":""},"top":{"xs":"","sm":"","md":"","lg":"","xl":""},"right":{"xs":"","sm":"","md":"","lg":"","xl":""},"bottom":{"xs":"","sm":"","md":"","lg":"","xl":""},"left":{"xs":"","sm":"","md":"","lg":"","xl":""}},"utilPadding":{"all":{"xs":"","sm":"","md":"","lg":"","xl":""},"horizontal":{"xs":"","sm":"","md":"","lg":"","xl":""},"vertical":{"xs":"","sm":"","md":"","lg":"","xl":""},"top":{"xs":"","sm":"","md":"","lg":"","xl":""},"right":{"xs":"","sm":"","md":"","lg":"","xl":""},"bottom":{"xs":"","sm":"","md":"","lg":"","xl":""},"left":{"xs":"","sm":"","md":"","lg":"","xl":""}},"utilText":{"align":{"xs":"","sm":"","md":"","lg":"","xl":""},"justify":"","wrapping":"","truncate":"","wordBreak":"","transform":"","weight":"","italics":"","monospace":"","resetColor":"","decoration":""}},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-bars"],"styles":{},"attributes":{}},"children":[]}]}]}
        `,
      },
      {
        toolboxInfo:{
          //groupId : 'groupThemUI',
          elementId : 'header',
          elementName : "Header",
          mouseFollowerWidth: '600px'
        },
        
        json:`
          {"name":"HTMLHeader","meta":{"tag":"header","classList":["masthead"],"styles":{},"attributes":{}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-text"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-lead-in"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Welcome To Our Studio!","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-heading"],"styles":{},"attributes":{},"utilText":{"transform":"text-uppercase"}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"It's Nice To Meet YouI","generalTextfield":"contentEditable"},"children":[]}]},{"name":"BSButton","meta":{"tag":"a","classList":["btn","btn-xl","js-scroll-trigger"],"styles":{},"attributes":{},"innerHTML":"Tell Me More","generalTextfield":"contentEditable","utilText":{"transform":"text-uppercase"},"buttonContextual":"btn-primary"},"children":[]}]}]}]}
        `,
      },

    ],

    initialPage:`[{"name":"BSTable","meta":{"tag":"table","classList":[],"styles":{},"attributes":{},"baseClass":"table"},"children":[{"name":"HTMLCaption","meta":{"tag":"caption","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"List of users"},"children":[]},{"name":"HTMLThead","meta":{"tag":"thead","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTr","meta":{"tag":"tr","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"#","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"First","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"Last","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"Handle","generalTextfield":"contentEditable"},"children":[]}]}]},{"name":"HTMLTbody","meta":{"tag":"tbody","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTr","meta":{"tag":"tr","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"1","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Mark"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Otto"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"@mdo"},"children":[]}]},{"name":"HTMLTr","meta":{"tag":"tr","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"2","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Jacob"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Thornton"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"@fat"},"children":[]}]},{"name":"HTMLTr","meta":{"tag":"tr","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLTh","meta":{"tag":"th","classList":[],"styles":{},"attributes":{},"innerHTML":"3","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Larry"},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"the Bird "},"children":[]},{"name":"HTMLTd","meta":{"tag":"td","classList":[],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"@twitter"},"children":[]}]}]}]},{"name":"HTMLHeader","meta":{"tag":"header","classList":["masthead"],"styles":{},"attributes":{}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":[],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-text"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-lead-in"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Welcome To Our Studio!","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-heading"],"styles":{},"attributes":{},"utilText":{"transform":"text-uppercase"}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"It's Nice To Meet YouI","generalTextfield":"contentEditable"},"children":[]}]},{"name":"BSButton","meta":{"tag":"a","classList":["btn","btn-xl","js-scroll-trigger"],"styles":{},"attributes":{},"innerHTML":"Tell Me More","generalTextfield":"contentEditable","utilText":{"transform":"text-uppercase"},"buttonContextual":"btn-primary"},"children":[]}]}]}]}]`,

  }
}

export {themes}

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
        {"name":"BSNavbar","meta":{"tag":"nav","classList":["fixed-top","navbar","navbar-expand-lg","navbar-dark"],"styles":{},"attributes":{"id":"mainNav"}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"BSNavbarBrand","meta":{"tag":"a","classList":["js-scroll-trigger","navbar-brand"],"styles":{},"attributes":{"href":"#page-top"},"innerHTML":"Start RXEditor","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["collapse","navbar-collapse"],"styles":{},"attributes":{"id":"navbarResponsive"}},"children":[{"name":"HTMLUl","meta":{"tag":"ul","classList":["navbar-nav","text-uppercase","ml-auto"],"styles":{},"attributes":{}},"children":[{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#services"},"innerHTML":"Services","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#portfolio"},"innerHTML":"Services","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#about"},"innerHTML":"About","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#team"},"innerHTML":"Team","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#contact"},"innerHTML":"Contact","generalTextfield":"contentEditable"},"children":[]}]}]}]},{"name":"BSNavbarToggler","meta":{"tag":"button","classList":["navbar-toggler","navbar-toggler-right"],"styles":{},"attributes":{"data-toggle":"collapse","data-target":"#navbarResponsive"}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Menu","generalTextfield":"contentEditable"},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-bars"],"styles":{},"attributes":{}},"children":[]}]}]}]}
        `,
      },
      {
        toolboxInfo:{
          elementId : 'header',
          elementName : "Header",
          mouseFollowerWidth: '600px'
        },
        
        json:`
          {"name":"HTMLHeader","meta":{"tag":"header","classList":["masthead"],"styles":{},"attributes":{}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-text"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-lead-in"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Welcome To Our Studio!"},"children":[]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-heading","text-uppercase"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"It's Nice To Meet You"},"children":[]},{"name":"BSButton","meta":{"tag":"a","classList":["btn","btn-primary","btn-xl","js-scroll-trigger","text-uppercase"],"styles":{},"attributes":{"href":"#"},"innerHTML":"Tell Me More","generalTextfield":"contentEditable"},"children":[]}]}]}]}
        `,
      },
      {
        toolboxInfo:{
          elementId : 'services',
          elementName : "Services",
          mouseFollowerWidth: '600px',
        },
        
        json:`
          {"name":"HTMLSection","meta":{"tag":"section","classList":["page-section"],"styles":{},"attributes":{"id":"services"}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"BSRow","meta":{"tag":"div","classList":["row"],"styles":{},"attributes":{}},"children":[{"name":"BSCol","meta":{"tag":"div","classList":["col-lg-12","text-center"],"styles":{},"attributes":{}},"children":[{"name":"BSHeading","meta":{"tag":"h2","classList":["section-heading","text-uppercase"],"styles":{},"attributes":{},"innerHTML":"Services","generalTextfield":"contentEditable"},"children":[]},{"name":"BSHeading","meta":{"tag":"h3","classList":[],"styles":{},"attributes":{},"innerHTML":"Lorem ipsum dolor sit amet consectetur.","generalTextfield":"contentEditable"},"children":[]}]}]},{"name":"BSRow","meta":{"tag":"div","classList":["row","text-center"],"styles":{},"attributes":{}},"children":[{"name":"BSCol","meta":{"tag":"div","classList":["col-md-4"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":["fa-stack","fa-4x"],"styles":{},"attributes":{},"innerHTML":"","generalTextfield":""},"children":[{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-circle","fas","text-primary","fa-stack-2x"],"styles":{},"attributes":{}},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fas","fa-shopping-cart","fa-stack-1x","fa-inverse"],"styles":{},"attributes":{}},"children":[]}]},{"name":"BSHeading","meta":{"tag":"h4","classList":[],"styles":{},"attributes":{},"innerHTML":"E-Commerce","generalTextfield":"contentEditable"},"children":[]},{"name":"BSParagraph","meta":{"tag":"p","classList":["text-muted"],"styles":{},"attributes":{},"innerHTML":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.","generalTextfield":"contentEditable"},"children":[]}]},{"name":"BSCol","meta":{"tag":"div","classList":["col-md-4"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":["fa-stack","fa-4x"],"styles":{},"attributes":{},"innerHTML":"","generalTextfield":""},"children":[{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-circle","fas","text-primary","fa-stack-2x"],"styles":{},"attributes":{}},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-inverse","fa-stack-1x","fas","fa-laptop"],"styles":{},"attributes":{}},"children":[]}]},{"name":"BSHeading","meta":{"tag":"h4","classList":[],"styles":{},"attributes":{},"innerHTML":"E-Responsive Design","generalTextfield":"contentEditable"},"children":[]},{"name":"BSParagraph","meta":{"tag":"p","classList":["text-muted"],"styles":{},"attributes":{},"innerHTML":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.","generalTextfield":"contentEditable"},"children":[]}]},{"name":"BSCol","meta":{"tag":"div","classList":["col-md-4"],"styles":{},"attributes":{}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":["fa-stack","fa-4x"],"styles":{},"attributes":{},"innerHTML":"","generalTextfield":""},"children":[{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-circle","fas","text-primary","fa-stack-2x"],"styles":{},"attributes":{}},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-inverse","fa-stack-1x","fas","fa-lock"],"styles":{},"attributes":{}},"children":[]}]},{"name":"BSHeading","meta":{"tag":"h4","classList":[],"styles":{},"attributes":{},"innerHTML":"E-Web Security","generalTextfield":"contentEditable"},"children":[]},{"name":"BSParagraph","meta":{"tag":"p","classList":["text-muted"],"styles":{},"attributes":{},"innerHTML":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.","generalTextfield":"contentEditable"},"children":[]}]}]}]}]}
        `,
      },

    ],

    initialPage:`[{"name":"BSNavbar","meta":{"tag":"nav","classList":["fixed-top","navbar","navbar-expand-lg","navbar-dark"],"styles":{},"attributes":{"id":"mainNav"}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"BSNavbarBrand","meta":{"tag":"a","classList":["js-scroll-trigger","navbar-brand"],"styles":{},"attributes":{"href":"#page-top"},"innerHTML":"Start RXEditor","generalTextfield":"contentEditable"},"children":[]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["collapse","navbar-collapse"],"styles":{},"attributes":{"id":"navbarResponsive"}},"children":[{"name":"HTMLUl","meta":{"tag":"ul","classList":["navbar-nav","text-uppercase","ml-auto"],"styles":{},"attributes":{}},"children":[{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#services"},"innerHTML":"Services","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#portfolio"},"innerHTML":"Services","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#about"},"innerHTML":"About","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#team"},"innerHTML":"Team","generalTextfield":"contentEditable"},"children":[]}]},{"name":"HTMLLi","meta":{"tag":"li","classList":["nav-item"],"styles":{},"attributes":{}},"children":[{"name":"HTMLA","meta":{"tag":"a","classList":["js-scroll-trigger","nav-link"],"styles":{},"attributes":{"href":"#contact"},"innerHTML":"Contact","generalTextfield":"contentEditable"},"children":[]}]}]}]},{"name":"BSNavbarToggler","meta":{"tag":"button","classList":["navbar-toggler","navbar-toggler-right"],"styles":{},"attributes":{"data-toggle":"collapse","data-target":"#navbarResponsive"}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Menu","generalTextfield":"contentEditable"},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-bars"],"styles":{},"attributes":{}},"children":[]}]}]}]},{"name":"HTMLHeader","meta":{"tag":"header","classList":["masthead"],"styles":{},"attributes":{}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-text"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-lead-in"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Welcome To Our Studio!"},"children":[]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-heading","text-uppercase"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"It's Nice To Meet You"},"children":[]},{"name":"BSButton","meta":{"tag":"a","classList":["btn","btn-primary","btn-xl","js-scroll-trigger","text-uppercase"],"styles":{},"attributes":{"href":"#"},"innerHTML":"Tell Me More","generalTextfield":"contentEditable"},"children":[]}]}]}]}]`
  }
}

export {themes}
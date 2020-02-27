
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
        {"name":"BSNavbar","meta":{"tag":"nav","classList":["navbar"],"styles":{},"attributes":{"id":"mainNav"}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"BSNavbarBrand","meta":{"tag":"a","classList":["js-scroll-trigger","navbar-brand"],"styles":{},"attributes":{"href":"#page-top"},"innerHTML":"Start RXEditor","generalTextfield":"contentEditable"},"children":[]},{"name":"BSNavbarToggler","meta":{"tag":"button","classList":["navbar-toggler","navbar-toggler-right"],"styles":{},"attributes":{"data-toggle":"collapse"}},"children":[{"name":"HTMLSpan","meta":{"tag":"span","classList":[],"styles":{},"attributes":{},"innerHTML":"Menu","generalTextfield":"contentEditable"},"children":[]},{"name":"IconFontAwesome","meta":{"tag":"i","classList":["fa","fa-bars"],"styles":{},"attributes":{}},"children":[]}]}]}]}
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
          {"name":"HTMLHeader","meta":{"tag":"header","classList":["masthead"],"styles":{},"attributes":{}},"children":[{"name":"BSContainer","meta":{"tag":"div","classList":["container"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-text"],"styles":{},"attributes":{}},"children":[{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-lead-in"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"Welcome To Our Studio!"},"children":[]},{"name":"HTMLDiv","meta":{"tag":"div","classList":["intro-heading","text-uppercase"],"styles":{},"attributes":{},"generalTextfield":"contentEditable","innerHTML":"It's Nice To Meet You"},"children":[]},{"name":"BSButton","meta":{"tag":"a","classList":["btn","btn-primary","btn-xl","js-scroll-trigger","text-uppercase"],"styles":{},"attributes":{"href":"#"},"innerHTML":"Tell Me More","generalTextfield":"contentEditable"},"children":[]}]}]}]}
        `,
      },

    ],

    initialPage:``
  }
}

export {themes}
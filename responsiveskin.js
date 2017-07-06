// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


parent.window.responsiveSkin  = {
  initialize: function() {
    this.leftId = '_left';
    this.rightId = '_right';

    this._window = parent.window;
    this._document = this._window.document;

    this.build();
    return this;
  },

    play : function () {
    var iframe_left = document.getElementById("adman-skin-left");
    var iframe_right = document.getElementById("adman-skin-right");
    Adman.html5API.send('sync', {fn: 'play'}, iframe_right);
  },

  build: function() {

    var self = this;

    this.skinWrapper = Adman.$C('div');
    this.skinWrapper.id = "adman-skin";

    this.loadjscssfile(responsiveSkinBase + 'skin.css', 'css');

    this._document.body.insertBefore(this.skinWrapper, this._document.body.childNodes[0]);

    this.skinLeft = Adman.$C('a');
    this.skinLeft.href = responsiveSkinClick;
    this.skinLeft.target = '_blank';

    this.skinLeft.id = 'adman-skin-left';
    this.skinLeft.innerHTML = '<div class="' + this.leftId + '">'
    + '<iframe id="adman-skin-iframe-left" src="' + responsiveSkinBase + 'nova_GoT_vidSkin_left_adman.html?click=' + responsiveSkinClick
    + '" border="0" onload="new Adman.Viewable(this, '+ countViewability+').enable()" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" width="216" height="817"></iframe>'
    + '</div>';

    this.skinWrapper.appendChild(this.skinLeft);

    this.skinRight = Adman.$C('a');
    this.skinRight.href = responsiveSkinClick;
    this.skinRight.target = '_blank';
    this.skinRight.id = 'adman-skin-right';
    this.skinRight.innerHTML = '<div class="' + this.rightId + '">'
    + '<iframe id="adman-skin-iframe-right" src="' + responsiveSkinBase + 'nova_GoT_vidSkin_right_adman.html?click=' + responsiveSkinClick
    + '" border="0" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" width="216" height="817"></iframe>'
    + '</div>';

    this.skinWrapper.appendChild(this.skinRight);

    this.skins = [this.skinLeft, this.skinRight];

    this.iframes = {
      left: this._document.getElementById('adman-skin-iframe-left'),
      right: this._document.getElementById('adman-skin-iframe-right')
    }

    if(this._window.location.host.match(/athinorama/)){
      this.skinWrapper.style.top = "29px";
    } else if (this._window.location.host.match(/lifo/)) {
        var el2 = this._document.getElementById("1x1_out");
        el2.appendChild(this.skinWrapper);
    }else if (this._window.location.host.match(/gazzetta/)) {
      this.skinWrapper.style.top = "127px";
      } else if(this._window.location.host.match(/sport24/)){

        this.skinWrapper.style.top = "169px";
    } else if (this._window.location.host.match(/athensvoice/)) {
      var offsetTop = 95;
      var carousel = parent.document.getElementsByClassName("wrapper slideshow clearfix")[0];
          if (typeof carousel != 'undefined'){

              var carouselBottom = carousel.getBoundingClientRect().bottom;
              if(carouselBottom>0)
                this.skinWrapper.style.top = "767px";//offsetTop + carouselBottom+"px";
              else this.skinWrapper.style.top = "55px";
          }
          else {
              //var nav = parent.document.getElementById("navigation");
              //var navBottom = nav.getBoundingClientRect().bottom;
              //this.skinWrapper.style.top = navBottom+"px";
              this.skinWrapper.style.top = "492px";
          }
    this._document.body.insertBefore(this.skinWrapper, this._document.body.childNodes[0]);
    }
    this.addEvents();
    return this;
  },



  loadjscssfile: function (filename, filetype) {
    if (filetype == "js") { // if filename is a external JavaScript file
        var fileref = this._document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css"){ // if filename is an external CSS file
      var fileref = this._document.createElement("link")
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    }

    if (typeof fileref !== "undefined") {
      this._document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  },

  addEvents: function() {
    var offsetTop = 55;
    var self = this;
    var pixelsOfScroll = parent.document.body.scrollTop;
    parent.scroll0 = parent.document.body.scrollTop


    if (isFirefox)
          parent.scroll0 = (document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;

        var admanskin = this._document.getElementById("adman-skin");

    if(this._window.location.host.match(/athinorama/)){
          this._window.addEventListener('scroll', function(evt) {

            pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
            console.log("scrolled:", pixelsOfScroll);

            if(pixelsOfScroll>50)  {
              admanskin.style.top = "37px";
            }else if(pixelsOfScroll<50)  {
              admanskin.style.top = "29px";
            }
          });
    } else if(this._window.location.host.match(/gazzetta/)){
          this._window.addEventListener('scroll', function(evt) {

            pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
            console.log("scrolled:", pixelsOfScroll);

            if(pixelsOfScroll>50)  {
              admanskin.style.top = "0px";
            }else if(pixelsOfScroll<50)  {
              admanskin.style.top = "127px";
            }
          });

    } else if(this._window.location.host.match(/popaganda/)){
    	  admanskin.style.top = "105px";
          this._window.addEventListener('scroll', function(evt) {

            pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
            console.log("scrolled:", pixelsOfScroll);

            if(pixelsOfScroll>50)  {
              admanskin.style.top = "30px";
            }else if(pixelsOfScroll<50)  {
              admanskin.style.top = "105px";
            }
          });

    } else if(this._window.location.host.match(/oneman/)){
              admanskin.style.top = "65px";
          this._window.addEventListener('scroll', function(evt) {

            pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
            console.log("scrolled:", pixelsOfScroll);

            if(pixelsOfScroll>100)  {
              admanskin.style.top = "25px";
            }else if(pixelsOfScroll<50)  {
              admanskin.style.top = "65px";
            }
          });
    } else if(this._window.location.host.match(/sport24/)){

      this._window.addEventListener('scroll', function(evt) {

        pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
        console.log("scrolled:", pixelsOfScroll);
        if(pixelsOfScroll>50)  {
          admanskin.style.top = "0px";
        } else {
          //var elR24 = document.querySelector('.ad.currentArea-hotTopics');
          admanskin.style.top = "169px";
        }
      });
    } else if(this._window.location.host.match(/news247/)){
      admanskin.style.top = "123px";
      this._window.addEventListener('scroll', function(evt) {

        pixelsOfScroll = (parent.document.body || document.documentElement || document.body.parentNode || document.body).scrollTop || window.parent.pageYOffset;
        console.log("scrolled:", pixelsOfScroll);
        if(pixelsOfScroll>50)  {
          admanskin.style.top = "0px";
        }else if(pixelsOfScroll<50)  {
          admanskin.style.top = "123px";
        }
      });

    }else if (this._window.location.host.match(/athensvoice/)) {

        this._window.addEventListener('scroll', function(evt) {
            //console.log("scrolled");

            pixelsOfScroll = parent.document.body.scrollTop;

            if(isFirefox)
            pixelsOfScroll = (document.documentElement || document.body.parentNode || document.body).scrollTop;

            var menuel = parent.document.getElementById('block-system-main-menu');
            var menurect = menuel.getBoundingClientRect();

            var carousel = parent.document.getElementsByClassName("wrapper slideshow clearfix")[0];

            if(pixelsOfScroll>parent.scroll0) {
              //move forward both iframes
              Adman.html5API.send('sync', {fn: 'forward'},self.iframes.left);
              Adman.html5API.send('sync', {fn: 'forward'},self.iframes.right);
              parent.scroll0 = parent.document.body.scrollTop;
              if(isFirefox)
                parent.scroll0 = (document.documentElement || document.body.parentNode || document.body).scrollTop;
            }
            else{
              //reverse both iframes
              Adman.html5API.send('sync', {fn: 'reverse'},self.iframes.left);
              Adman.html5API.send('sync', {fn: 'reverse'},self.iframes.right);
              parent.scroll0 = parent.document.body.scrollTop;
              if(isFirefox)
                parent.scroll0 = (document.documentElement || document.body.parentNode || document.body).scrollTop;

            }

            if (typeof carousel != 'undefined'){
                var carouselTop = carousel.getBoundingClientRect().top;
                var carouselBottom = carousel.getBoundingClientRect().bottom;

                var isVisible = (carouselTop >= 0) && (carouselBottom <= window.innerHeight);

                if(carouselBottom<=0)
                    admanskin.style.top = offsetTop+menurect.bottom+"px";
                else
                    admanskin.style.top = carouselBottom+"px";


                //console.log("pixelsOfScroll"+pixelsOfScroll);
            }
            else {
                var nav = parent.document.getElementById("navigation");
                var navBottom = nav.getBoundingClientRect().bottom;
                // admanskin.style.top = navBottom+"px";
                if(navBottom<=0) {
                    if (pixelsOfScroll == 0) offsetTop = 210;
                    else offsetTop = 55;

                    admanskin.style.top = offsetTop+menurect.bottom+"px";
                    //console.log("pixelsOfScroll"+pixelsOfScroll);
                }
                else
                    admanskin.style.top = navBottom+"px";
            }

        });
    }
    this.calculateWidths();

    Adman.addEvent(this._window, 'resize', function() {
        (function() {
          self.calculateWidths();
        })._delay(100)
    });

    Adman.addEvent(this._window, 'DOMContentLoaded', function(event) {
        self.calculateWidths();
    });

    Adman.addEvent(this._window, 'load', function(event) {
        self.calculateWidths();
    });


    this._window.play = function () {
      Adman.html5API.send('sync', {fn: 'play'}, self.iframes.right);
    };
  },

  calculateWidths: function() {
    var contentWidth = 1268;
    var maxWidth = this._window.getWidth? this._window.getWidth() : (this._window.innerWidth - (this._window.document.body.offsetHeight > this._window.innerHeight ? 20 : 0));

    if ( this._window.location.host.match(/athinorama/)) {
          contentWidth = 970;
        this.skinWrapper.style.zIndex = 2147483647;
    } else if ( this._window.location.host.match(/lifo/)) {
        this.skinWrapper.style.zIndex = 1;
        contentWidth = 1000;
        maxWidth = 1900; // this is major difference for lifo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    } else if ( this._window.location.host.match(/contra/)) {
        contentWidth = 1000;
    } else if ( this._window.location.host.match(/tokoulouri/)) {
        contentWidth = 1180;
    } else if ( this._window.location.host.match(/sport24/)) {
        contentWidth = 978;
    } else if ( this._window.location.host.match(/in2life/)) {
        contentWidth = 1050;
    } else if ( this._window.location.host.match(/avopolis/)) {
        contentWidth = 1120;
    } else if ( this._window.location.host.match(/newsbeast/)) {
        contentWidth = 1124;
    } else if ( this._window.location.host.match(/popaganda/)) {
        this.skinWrapper.style.zIndex = 1;
        contentWidth = 1184;
    } else if ( this._window.location.host.match(/newsbomb/)) {
        contentWidth = 1050;
    } else if ( this._window.location.host.match(/oneman/)) {
        contentWidth = 990;
    } else if ( this._window.location.host.match(/news247/)) {
        contentWidth = 1000;
    } else if ( this._window.location.host.match(/gazzetta/)) {
      this.skinWrapper.style.zIndex = 2147483647;
      contentWidth = 1230;
    }else if ( this._window.location.host.match(/novasports/)) {
        contentWidth = 1200;
        if(maxWidth < 1481){
          contentWidth = 1032;
        }
        if(maxWidth < 1278){
          contentWidth = 1000;
        }
    }else if ( this._window.location.host.match(/novaguide/)) {
        this.skinWrapper.style.zIndex = 1;
        this.skinWrapper.style.top = "85px";
        contentWidth = 1220;
        if(maxWidth < 1481){
          contentWidth = 1032;
        }
        if(maxWidth < 1278){
          contentWidth = 1000;
        }
    } else if ( this._window.location.host.match(/athensvoice/)) {
      contentWidth = 995;
    }

    //gazzetta category protoselida
    if ( this._window.location.host.match(/gazzetta/) && this._window.location.href.match(/protoselida/)) {
          this.skinWrapper.style.zIndex = 2147483647;
          contentWidth = 980;
    }

    var  skinWidth    = (maxWidth - contentWidth) / 2;

    if (skinWidth < 0)
      skinWidth = 0;

    if (skinWidth >= 0) {
      this.skinLeft.style.width = skinWidth + 'px';
      this.skinRight.style.width = skinWidth + 'px';
    }

    return this;
  },
  getWidth        : function(){
        // NOTE: window.innerpWidth|Height] >> includes vertical bars
        // CHANGED: 08.09.09
        // WAS window.safari2 - changed to : window.safari

        // CHANGED: 08.09.09
        // Added Webkit thing for detecting scrollbars (slow but works)
        return  window.webkit ?
        this._window.innerWidth - (this._window.document.body.offsetHeight > this._window.innerHeight ? 20 : 0) :
        this._window.getBody().clientWidth;
  }



}.initialize();
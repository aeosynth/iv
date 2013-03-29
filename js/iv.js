(function(){
  var log, $, IV, out$ = typeof exports != 'undefined' && exports || this;
  log = bind$(console, 'log');
  $ = function(selector, root){
    var el;
    root == null && (root = document.body);
    if (typeof selector === 'string') {
      el = root.querySelector(selector);
    } else {
      el = selector;
    }
    return {
      on: function(type, cb){
        return el.addEventListener(type, cb);
      },
      off: function(type, cb){
        return el.removeEventListener(type, cb);
      },
      add: function(it){
        return el.appendChild(it);
      },
      replaceWith: function(it){
        return el.parentNode.replaceChild(it, el);
      },
      scrollBy: function(dx, dy){
        el.scrollLeft += dx;
        return el.scrollTop += dy;
      },
      scrollTo: function(x, y){
        el.scrollLeft = x;
        return el.scrollTop = y;
      },
      el: el
    };
  };
  out$.IV = IV = {
    init: function(urls, index){
      var x0$, res$, i$, len$, url;
      this.index = index;
      x0$ = IV.overlay = $('#iv');
      x0$.on('mousewheel', IV.wheel);
      x0$.on('mousedown', IV.dragstart);
      x0$.on('click', IV.click);
      res$ = [];
      for (i$ = 0, len$ = urls.length; i$ < len$; ++i$) {
        url = urls[i$];
        res$.push((fn$.call(this, url)));
      }
      IV.imgs = res$;
      IV.img = IV.imgs[IV.index];
      IV.img.$el.on('load', function(){
        IV.overlay.add(this);
        return IV.resize();
      });
      return $(window).on('resize', IV.resize);
      function fn$(url){
        var x1$, el, $el, img;
        x1$ = el = new Image;
        x1$.src = url;
        $el = $(el);
        img = {
          el: el,
          $el: $el,
          dirty: false
        };
        $el.on('load', function(){
          return img.width = this.width, img.height = this.height, this;
        });
        return img;
      }
    },
    resize: function(){
      var img, overlay, ref$, ow, oh, width, height, scale;
      img = IV.img, overlay = IV.overlay;
      ref$ = overlay.el, ow = ref$.clientWidth, oh = ref$.clientHeight;
      width = img.width, height = img.height;
      if (width > ow || height > oh) {
        scale = Math.min(ow / width, oh / height);
        img.minWidth = width * scale | 0;
      } else {
        img.minWidth = width;
      }
      if (!img.dirty) {
        return img.el.width = img.minWidth;
      }
    },
    next: function(){
      return IV.delta(+1);
    },
    prev: function(){
      return IV.delta(-1);
    },
    delta: function(it){
      var l, $el;
      l = IV.imgs.length;
      IV.index = (IV.index + it + l) % l;
      $el = IV.img.$el;
      IV.img = IV.imgs[IV.index];
      IV.resize();
      return $el.replaceWith(IV.img.el);
    },
    wheel: function(e){
      var x, y, scale, ref$, sx, sy, x0, y0, img, el, oldWidth, x1, y1, x0$;
      x = e.x, y = e.y;
      e.preventDefault();
      scale = e.wheelDelta > 0 ? 1.1 : 0.9;
      ref$ = IV.overlay.el, sx = ref$.scrollLeft, sy = ref$.scrollTop;
      x0 = sx + x;
      y0 = sy + y;
      img = IV.img;
      el = img.el;
      oldWidth = el.width;
      el.width = Math.max(Math.min(el.width * scale, img.width), img.minWidth);
      scale = el.width / oldWidth;
      x1 = x0 * scale - x;
      y1 = y0 * scale - y;
      IV.overlay.scrollTo(x1, y1);
      x0$ = IV.img;
      x0$.dirty = x0$.el.width !== x0$.minWidth;
      return x0$;
    },
    click: function(arg$){
      var button;
      button = arg$.button;
      if (IV.img.dirty) {
        return;
      }
      switch (button) {
      case 0:
        return IV.next();
      case 1:
        return IV.prev();
      }
    },
    dragstart: function(arg$){
      var x0$;
      IV.x = arg$.x, IV.y = arg$.y;
      x0$ = $(window);
      x0$.on('mousemove', IV.dragmove);
      x0$.on('mouseup', IV.dragend);
      return x0$;
    },
    dragmove: function(arg$){
      var x, y, x0$;
      x = arg$.x, y = arg$.y;
      x0$ = IV;
      x0$.overlay.scrollBy(IV.x - x, IV.y - y);
      x0$.x = x;
      x0$.y = y;
      return x0$;
    },
    dragend: function(){
      var x0$;
      x0$ = $(window);
      x0$.off('mousemove', IV.dragmove);
      x0$.off('mouseup', IV.dragend);
      return x0$;
    }
  };
  function bind$(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);

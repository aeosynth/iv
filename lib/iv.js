var log, $, IV;
log = bind$(console, 'log');
$ = require('$');
IV = {
  init: function(urls, index){
    var x0$, res$, i$, len$, url, x1$;
    IV.index = index != null ? index : 0;
    $("<style>" + IV.css + "</style>").addTo(document.head);
    x0$ = IV.overlay = $('<div id="iv">');
    x0$.on('mousewheel', IV.mousewheel);
    x0$.on('wheel', IV.wheel);
    x0$.on('mousedown', IV.dragstart);
    x0$.on('click', IV.click);
    x0$.addTo(document.body);
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
    x1$ = $(window);
    x1$.on('resize', IV.resize);
    x1$.on('keydown', IV.keydown);
    return x1$;
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
  rm: function(){
    var x0$;
    IV.overlay.rm();
    x0$ = $(window);
    x0$.off('resize', IV.resize);
    x0$.off('keydown', IV.keydown);
    return x0$;
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
    return $el.replace(IV.img.el);
  },
  keydown: function(e){
    switch (e.which) {
    case 27:
      return IV.rm();
    case 32:
      if (e.shiftKey) {
        return IV.prev();
      } else {
        return IV.next();
      }
    }
  },
  wheel: function(e){
    var sign;
    sign = e.deltaY < 0
      ? +1
      : -1;
    return IV.zoom(e, sign);
  },
  mousewheel: function(e){
    var sign;
    sign = e.wheelDelta > 0
      ? +1
      : -1;
    return IV.zoom(e, sign);
  },
  zoom: function(e, sign){
    var scale, x, y, ref$, sx, sy, x0, y0, img, el, oldWidth, x1, y1, x0$;
    e.preventDefault();
    scale = 1 + sign * 0.1;
    x = e.x, y = e.y;
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
    IV.x = arg$.clientX, IV.y = arg$.clientY;
    x0$ = $(window);
    x0$.on('mousemove', IV.dragmove);
    x0$.on('mouseup', IV.dragend);
    return x0$;
  },
  dragmove: function(arg$){
    var x, y, x0$;
    x = arg$.clientX, y = arg$.clientY;
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
  },
  css: 'body {\n  overflow: hidden;\n}\n\n#iv {\n  overflow: auto;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n  display: -webkit-flex;\n  top:    0;\n  left:   0;\n  right:  0;\n  bottom: 0;\n  position: fixed;\n  background-color: black;\n}\n\n#iv > img {\n  pointer-events: none;\n  /*\n  * https://developer.mozilla.org/en-US/docs/CSS/Tutorials/Using_CSS_flexible_boxes#Flex_item_considerations\n  * flex items will stay centered, even if they overflow the flex container.\n  * This can sometimes be problematic, however, if they overflow past the top\n  * edge of the page ... as you can\'t scroll to that area, even if there is\n  * content there!  ... For now, you can instead use margins to achieve\n  * centering\n  */\n  margin: auto;\n}'
};
module.exports = IV.init;
function bind$(obj, key){
  return function(){ return obj[key].apply(obj, arguments) };
}
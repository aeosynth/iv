var domify, $;
domify = function(html){
  var x0$, el;
  x0$ = el = document.createElement('div');
  x0$.innerHTML = html;
  return el.removeChild(el.firstChild);
};
$ = function(el){
  if (typeof el === 'string') {
    el = domify(el);
  }
  return {
    on: function(type, cb){
      return el.addEventListener(type, cb);
    },
    off: function(type, cb){
      return el.removeEventListener(type, cb);
    },
    rm: function(){
      return el.parentNode.removeChild(el);
    },
    add: function(it){
      return el.appendChild(it);
    },
    addTo: function(it){
      return it.appendChild(el);
    },
    replace: function(it){
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
module.exports = $;
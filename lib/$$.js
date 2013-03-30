var $$, slice$ = [].slice;
$$ = function(selector, root){
  var nodes;
  root == null && (root = document.body);
  nodes = slice$.call(root.querySelectorAll(selector));
  return {
    pluck: function(key){
      var i$, ref$, len$, node, results$ = [];
      for (i$ = 0, len$ = (ref$ = nodes).length; i$ < len$; ++i$) {
        node = ref$[i$];
        results$.push(node[key]);
      }
      return results$;
    }
  };
};
module.exports = $$;
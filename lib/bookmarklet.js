var $$, iv, key, selector, urls;
$$ = require('$$');
iv = require('iv');
key = 'aeos.iv-alpha.selector';
selector = localStorage[key] || '';
selector = prompt('selector', selector);
localStorage[key] = selector;
urls = $$(selector).pluck('href');
iv(urls);
(function(A,G){if(typeof define=='function'&&define.amd)define([],G);else if(typeof module=='object'&&module.exports)module.exports=G();else A.domtagger=G()}(typeof self!='undefined'?self:this,function(){
/*! (c) Andrea Giammarchi - ISC */var domtagger=function(m){"use strict";var e={};try{e.WeakMap=WeakMap}catch(t){e.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,a=o.prototype;return a.delete=function(t){return this.has(t)&&delete t[this._]},a.get=function(t){return this.has(t)?t[this._]:void 0},a.has=function(t){return r.call(t,this._)},a.set=function(t,e){return n(t,this._,{configurable:!0,value:e}),this},o;function o(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(i,this)}function i(t){this.set(t[0],t[1])}}(Math.random(),Object)}var t,c,u,n,r,a,o,i,s,l,h=e.WeakMap,f=function(e){var o="fragment",i="template",n="content"in u(i)?function(t){var e=u(i);return e.innerHTML=t,e.content}:function(t){var e=u(o),n=u(i),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(t)){var a=RegExp.$1;n.innerHTML="<table>"+t+"</table>",r=n.querySelectorAll(a)}else n.innerHTML=t,r=n.childNodes;return c(e,r),e};return function(t,e){return("svg"===e?function(t){var e=u(o),n=u("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t+"</svg>",c(e,n.firstChild.childNodes),e}:n)(t)};function c(t,e){for(var n=e.length;n--;)t.appendChild(e[0])}function u(t){return t===o?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",t)}}(m),p=(c="appendChild",u="cloneNode",n="createTextNode",a=(r="importNode")in(t=m),(o=t.createDocumentFragment())[c](t[n]("g")),o[c](t[n]("")),(a?t[r](o,!0):o[u](!0)).childNodes.length<2?function t(e,n){for(var r=e[u](),a=e.childNodes||[],o=a.length,i=0;n&&i<o;i++)r[c](t(a[i],n));return r}:a?t[r]:function(t,e){return t[u](!!e)}),d="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},x="-"+Math.random().toFixed(6)+"%";i=m.createElement("template"),l="tabindex",(s="content")in i&&(i.innerHTML="<p "+l+'="'+x+'"></p>',i[s].childNodes[0].getAttribute(l)==x)||(x="_dt: "+x.slice(1,-1)+";");var v="\x3c!--"+x+"--\x3e",g=8,w=1,b=3,N=/^(?:style|textarea)$/i,y=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var M=" \\f\\n\\r\\t",k="[^ "+M+"\\/>\"'=]+",C="[ "+M+"]+"+k,E="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",T="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+k+"))?)",_=new RegExp(E+C+T+"+)([ "+M+"]*/?>)","g"),A=new RegExp(E+C+T+"*)([ "+M+"]*/>)","g"),$=new RegExp("("+C+"\\s*=\\s*)(['\"]?)"+v+"\\2","gi");function L(t,e,n,r){return"<"+e+n.replace($,S)+r}function S(t,e,n){return e+(n||'"')+x+(n||'"')}function H(t,e,n){return y.test(e)?t:"<"+e+n+"></"+e+">"}var R={};try{R.Map=Map}catch(t){R.Map=function(){var n=0,r=[],a=[];return{delete:function(t){var e=o(t);return e&&(r.splice(n,1),a.splice(n,1)),e},get:function(t){return o(t)?a[n]:void 0},has:function(t){return o(t)},set:function(t,e){return a[o(t)?n:r.push(t)-1]=e,this}};function o(t){return-1<(n=r.indexOf(t))}}}var W=R.Map;function j(t,e,n,r){return{name:r,node:e,path:n,type:t}}function F(t,e){for(var n=e.length,r=0;r<n;)t=t.childNodes[e[r++]];return t}function O(t,e,n,r){for(var a=new W,o=t.attributes,i=[],c=i.slice.call(o,0),u=c.length,s=0;s<u;){var l=c[s++];if(l.value===x){var h=l.name;if(!a.has(h)){var f=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),p=o[f]||o[f.toLowerCase()];a.set(h,p),e.push(j("attr",p,r,f))}i.push(l)}}for(u=i.length,s=0;s<u;){var d=i[s++];/^id$/i.test(d.name)?t.removeAttribute(d.name):t.removeAttributeNode(d)}var v=t.nodeName;if(/^script$/i.test(v)){var g=m.createElement(v);for(u=o.length,s=0;s<u;)g.setAttributeNode(o[s++].cloneNode(!0));g.textContent=t.textContent,t.parentNode.replaceChild(g,t)}}var z=new h,D=new h;function P(i,c){var t=function(t){return t.join(v).replace(A,H).replace(_,L)}(c),e=i.transform;e&&(t=e(t));var n=f(t,i.type);!function(t){var e=t.childNodes,n=e.length;for(;n--;){var r=e[n];1!==r.nodeType&&0===d.call(r.textContent).length&&t.removeChild(r)}}(n);var u=[];!function t(e,n,r,a){for(var o=e.childNodes,i=o.length,c=0;c<i;){var u=o[c];switch(u.nodeType){case w:var s=a.concat(c);O(u,n,r,s),t(u,n,r,s);break;case g:u.textContent===x&&(r.shift(),n.push(N.test(e.nodeName)?j("text",e,a):j("any",u,a.concat(c))));break;case b:N.test(e.nodeName)&&d.call(u.textContent)===v&&(r.shift(),n.push(j("text",e,a)))}c++}}(n,u,c.slice(0),[]);var r={content:n,updates:function(r){for(var a=[],o=u.length,t=0;t<o;){var e=u[t++],n=F(r,e.path);switch(e.type){case"any":a.push(i.any(n,[]));break;case"attr":a.push(i.attribute(n,e.name,e.node));break;case"text":a.push(i.text(n)),n.textContent=""}}return function(){var t=arguments.length,e=t-1,n=1;if(o!==e)throw new Error(e+" values instead of "+o+"\n"+c.join(", "));for(;n<t;)a[n-1](arguments[n++]);return r}}};return z.set(c,r),r}return function(n){return function(t){var e=D.get(n);return null!=e&&e.template===t||(e=function(t,e){var n=z.get(e)||P(t,e),r=p.call(m,n.content,!0),a={content:r,template:e,updates:n.updates(r)};return D.set(t,a),a}(n,t)),e.updates.apply(null,arguments),e.content}}}(document);
return domtagger}));

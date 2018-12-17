/*! (c) Andrea Giammarchi - ISC */var domtagger=function(g){"use strict";var t={};try{t.WeakMap=WeakMap}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,a=o.prototype;return a.delete=function(e){return this.has(e)&&delete e[this._]},a.get=function(e){return this.has(e)?e[this._]:void 0},a.has=function(e){return r.call(e,this._)},a.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},o;function o(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(i,this)}function i(e){this.set(e[0],e[1])}}(Math.random(),Object)}var e,c,u,n,r,a,o,i,s,l,h=t.WeakMap,f=function(t){var o="fragment",i="template",n="content"in u(i)?function(e){var t=u(i);return t.innerHTML=e,t.content}:function(e){var t=u(o),n=u(i),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(a)}else n.innerHTML=e,r=n.childNodes;return c(t,r),t};return function(e,t){return("svg"===t?function(e){var t=u(o),n=u("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",c(t,n.firstChild.childNodes),t}:n)(e)};function c(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function u(e){return e===o?t.createDocumentFragment():t.createElementNS("http://www.w3.org/1999/xhtml",e)}}(g),d=(c="appendChild",u="cloneNode",n="createTextNode",a=(r="importNode")in(e=g),(o=e.createDocumentFragment())[c](e[n]("g")),o[c](e[n]("")),(a?e[r](o,!0):o[u](!0)).childNodes.length<2?function e(t,n){for(var r=t[u](),a=t.childNodes||[],o=a.length,i=0;n&&i<o;i++)r[c](e(a[i],n));return r}:a?e[r]:function(e,t){return e[u](!!t)}),p="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},m="-"+Math.random().toFixed(6)+"%";i=g.createElement("template"),l="tabindex",(s="content")in i&&(i.innerHTML="<p "+l+'="'+m+'"></p>',i[s].childNodes[0].getAttribute(l)==m)||(m="_dt: "+m.slice(1,-1)+";");var v="\x3c!--"+m+"--\x3e",w=8,x=11,b=1,N=3,y=/^(?:style|textarea)$/i,M=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var k=" \\f\\n\\r\\t",C="[^ "+k+"\\/>\"'=]+",E="[ "+k+"]+"+C,T="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",_="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+C+"))?)",A=new RegExp(T+E+_+"+)([ "+k+"]*/?>)","g"),$=new RegExp(T+E+_+"*)([ "+k+"]*/>)","g"),L=new RegExp("("+E+"\\s*=\\s*)(['\"]?)"+v+"\\2","gi");function S(e,t,n,r){return"<"+t+n.replace(L,H)+r}function H(e,t,n){return t+(n||'"')+m+(n||'"')}function O(e,t,n){return M.test(t)?e:"<"+t+n+"></"+t+">"}var R={};try{R.Map=Map}catch(e){R.Map=function(){var n=0,r=[],a=[];return{delete:function(e){var t=o(e);return t&&(r.splice(n,1),a.splice(n,1)),t},get:function(e){return o(e)?a[n]:void 0},has:function(e){return o(e)},set:function(e,t){return a[o(e)?n:r.push(e)-1]=t,this}};function o(e){return-1<(n=r.indexOf(e))}}}var W=R.Map,j=-1;function F(e,t,n){return{type:e,name:n,node:t,path:function(e){var t,n=[];switch(e.nodeType){case b:case x:t=e;break;case w:t=e.parentNode,P(n,t,e);break;default:t=e.ownerElement}for(;t=(e=t).parentNode;)P(n,t,e);return n}(t)}}function z(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function D(e,t,n){for(var r=new W,a=e.attributes,o=[],i=o.slice.call(a,0),c=i.length,u=0;u<c;){var s=i[u++];if(s.value===m){var l=s.name;if(!r.has(l)){var h=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),f=a[h]||a[h.toLowerCase()];r.set(l,f),t.push(F("attr",f,h))}o.push(s)}}for(c=o.length,u=0;u<c;){var d=o[u++];/^id$/i.test(d.name)?e.removeAttribute(d.name):e.removeAttributeNode(d)}var p=e.nodeName;if(/^script$/i.test(p)){var v=g.createElement(p);for(c=a.length,u=0;u<c;)v.setAttributeNode(a[u++].cloneNode(!0));v.textContent=e.textContent,e.parentNode.replaceChild(v,e)}}function P(e,t,n){e.unshift(j<0?e.indexOf.call(t.childNodes,n):j),j=-1}var Z=new h,q=new h;function B(i,c){var e=c.join(v).replace($,O).replace(A,S),t=i.transform;t&&(e=t(e));var n=f(e,i.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===p.call(r.textContent).length&&e.removeChild(r)}}(n);var u=[];!function e(t,n,r){for(var a=t.childNodes,o=a.length,i=0;i<o;){var c=a[j=i++];switch(c.nodeType){case b:D(c,n,r),e(c,n,r);break;case w:c.textContent===m&&(r.shift(),n.push(y.test(t.nodeName)?F("text",t):F("any",c)));break;case N:y.test(t.nodeName)&&p.call(c.textContent)===v&&(r.shift(),n.push(F("text",t)))}}}(n,u,c.slice(0));var r={content:n,updates:function(r){for(var a=[],o=u.length,e=0;e<o;){var t=u[e++],n=z(r,t.path);switch(t.type){case"any":a.push(i.any(n,[]));break;case"attr":a.push(i.attribute(n,t.name,t.node));break;case"text":a.push(i.text(n)),n.textContent=""}}return function(){var e=arguments.length,t=e-1,n=1;if(o!==t)throw new Error(t+" values instead of "+o+"\n"+c.join(", "));for(;n<e;)a[n-1](arguments[n++]);return r}}};return Z.set(c,r),r}return function(c){return function(e){var t,n,r,a,o,i=q.get(c);return null!=i&&i.template===e||(t=c,n=e,r=Z.get(n)||B(t,n),a=d.call(g,r.content,!0),o={content:a,template:n,updates:r.updates(a)},q.set(t,o),i=o),i.updates.apply(null,arguments),i.content}}}(document);
export default domtagger;

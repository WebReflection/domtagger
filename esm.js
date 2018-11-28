/*! (c) Andrea Giammarchi - ISC */var domtagger=function(g){"use strict";var o={};try{o.Symbol=Symbol}catch(e){!function(t,n,r){function a(e){return new t("Symbol(_@ungap/"+e+")")}a.for=function(e){return n[e]||(n[e]=a(r++))},o.Symbol=a}(String,Object.create(null),Math.random())}var e=o.Symbol,t={};try{t.WeakMap=WeakMap}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,a=o.prototype;return a.delete=function(e){return this.has(e)&&delete e[this._]},a.get=function(e){return this.has(e)?e[this._]:void 0},a.has=function(e){return r.call(e,this._)},a.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},o;function o(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(i,this)}function i(e){this.set(e[0],e[1])}}(Math.random(),Object)}var n,u,c,r,a,i,s,l=t.WeakMap,f=function(t,o){var i="fragment",u="template",n="content"in s(u)?function(e){var t=s(u);return t.innerHTML=e,t.content}:function(e){var t=s(i),n=s(u),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(a)}else n.innerHTML=e,r=n.childNodes;return o.call(r,c,t),t};return function(e,t){return("svg"===t?function(e){var t=s(i),n=s("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",o.call(n.firstChild.childNodes,c,t),t}:n)(e)};function c(e){this.appendChild(e)}function s(e){return e===i?t.createDocumentFragment():t.createElement(e)}}(g,[].forEach),h=(u="appendChild",c="cloneNode",r="createTextNode",i=(a="importNode")in(n=g),(s=n.createDocumentFragment())[u](n[r]("g")),s[u](n[r]("")),(i?n[a](s,!0):s[c](!0)).childNodes.length<2?function e(t,n){for(var r=t[c](),a=t.childNodes||[],o=a.length,i=0;n&&i<o;i++)r[u](e(a[i],n));return r}:i?n[a]:function(e,t){return e[c](!!t)}),m="-0"+Math.random()+"0%",p="\x3c!--"+m+"--\x3e",d=8,v=11,y=1,b=3,w=/^(?:style|textarea)$/i,x=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var N=" \\f\\n\\r\\t",M="[^ "+N+"\\/>\"'=]+",k="[ "+N+"]+"+M,S="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",C="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+M+"))?)",E=new RegExp(S+k+C+"+)([ "+N+"]*/?>)","g"),_=new RegExp(S+k+C+"*)([ "+N+"]*/>)","g"),T=new RegExp("("+k+"\\s*=\\s*)(['\"]?)"+p+"\\2","gi");function $(e,t,n,r){return"<"+t+n.replace(T,A)+r}function A(e,t,n){return t+(n||'"')+m+(n||'"')}function O(e,t,n){return x.test(t)?e:"<"+t+n+"></"+t+">"}var j="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")};function L(){for(var e=[],t=0,n=+this,r=arguments.length;n<r;)e[t++]=arguments[n++];return e}var H={};try{H.Map=Map}catch(e){H.Map=function(){var n=0,r=[],a=[];return{delete:function(e){var t=o(e);return t&&(r.splice(n,1),a.splice(n,1)),t},get:function(e){return o(e)?a[n]:void 0},has:function(e){return o(e)},set:function(e,t){return a[o(e)?n:r.push(e)-1]=t,this}};function o(e){return-1<(n=r.indexOf(e))}}}var R=H.Map;function W(e,t,n){return{type:e,name:n,node:t,path:function(e){var t,n=[];switch(e.nodeType){case y:case v:t=e;break;case d:t=e.parentNode,P(n,t,e);break;default:t=e.ownerElement}for(;t=(e=t).parentNode;)P(n,t,e);return n}(t)}}function D(e,t){for(var n=0,r=t.length;n<r;)e=e.childNodes[t[n++]];return e}function F(e,t,n){for(var r=new R,a=e.attributes,o=L.apply(0,a),i=[],u=0,c=o.length;u<c;){var s=o[u++];if(s.value===m){var l=s.name;if(!r.has(l)){var f=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),h=a[f]||a[f.toLowerCase()];r.set(l,h),t.push(W("attr",h,f))}i.push(s)}}for(u=0,c=i.length;u<c;){var p=i[u++];/^id$/i.test(p.name)?e.removeAttribute(p.name):e.removeAttributeNode(p)}var d=e.nodeName;if(/^script$/i.test(d)){var v=g.createElement(d);for(u=0,c=a.length;u<c;)v.setAttributeNode(a[u++].cloneNode(!0));v.textContent=e.textContent,e.parentNode.replaceChild(v,e)}}function P(e,t,n){e.unshift(e.indexOf.call(t.childNodes,n))}var z=e(),Z=new l,q=new l;function B(i,u){var e=u.join(p).replace(_,O).replace(E,$),t=i.transform;t&&(e=t(e));var n=f(e,i.type),c=[];!function e(t,n,r){for(var a=0,o=t.childNodes,i=o.length;a<i;){var u=o[a++];switch(u.nodeType){case y:F(u,n,r),e(u,n,r);break;case d:u.textContent===m&&(r.shift(),n.push(w.test(t.nodeName)?W("text",t):W("any",u)));break;case b:w.test(t.nodeName)&&j.call(u.textContent)===p&&(r.shift(),n.push(W("text",t)))}}}(n,c,u.slice(0));var r={content:n,updates:function(n){for(var r=[],e=0,a=c.length;e<a;){var t=c[e++],o=D(n,t.path);switch(t.type){case"any":r.push(i.any(o,[]));break;case"attr":r.push(i.attribute(o,t.name,t.node));break;case"text":r.push(i.text(o)),o.textContent=""}}return function(){var e=0,t=arguments.length;if(a!==t)throw new Error(t+" values instead of "+a+"\n"+u.join(", "));for(;e<t;)r[e](arguments[e++]);return n}}};return q.set(u,r),r}return Object.defineProperty(g.createDocumentFragment().constructor.prototype,z,{value:function(){return Z.get(this).apply(this,arguments)}}),function(r){return function(e){var t=q.get(e)||B(r,e),n=h.call(g,t.content,!0);return Z.set(n,t.updates(n)),n[z].apply(n,L.apply(1,arguments))}}}(document);
export default domtagger;

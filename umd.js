(function(A,G){if(typeof define=='function'&&define.amd)define([],G);else if(typeof module=='object'&&module.exports)module.exports=G();else A.domtagger=G()}(typeof self!='undefined'?self:this,function(){
/*! (c) Andrea Giammarchi - ISC */var domtagger=function(g){"use strict";var t={};try{t.WeakMap=WeakMap}catch(e){t.WeakMap=function(t,e){var n=e.defineProperty,r=e.hasOwnProperty,a=i.prototype;return a.delete=function(e){return this.has(e)&&delete e[this._]},a.get=function(e){return this.has(e)?e[this._]:void 0},a.has=function(e){return r.call(e,this._)},a.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},i;function i(e){n(this,"_",{value:"_@ungap/weakmap"+t++}),e&&e.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var e,u,c,n,r,a,i,o,s,l,f=t.WeakMap,h=function(t){var i="fragment",o="template",n="content"in c(o)?function(e){var t=c(o);return t.innerHTML=e,t.content}:function(e){var t=c(i),n=c(o),r=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;n.innerHTML="<table>"+e+"</table>",r=n.querySelectorAll(a)}else n.innerHTML=e,r=n.childNodes;return u(t,r),t};return function(e,t){return("svg"===t?function(e){var t=c(i),n=c("div");return n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",u(t,n.firstChild.childNodes),t}:n)(e)};function u(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function c(e){return e===i?t.createDocumentFragment():t.createElement(e)}}(g),p=(u="appendChild",c="cloneNode",n="createTextNode",a=(r="importNode")in(e=g),(i=e.createDocumentFragment())[u](e[n]("g")),i[u](e[n]("")),(a?e[r](i,!0):i[c](!0)).childNodes.length<2?function e(t,n){for(var r=t[c](),a=t.childNodes||[],i=a.length,o=0;n&&o<i;o++)r[u](e(a[o],n));return r}:a?e[r]:function(e,t){return e[c](!!t)}),m="-"+Math.random().toFixed(6)+"%";o=g.createElement("template"),l="tabindex",(s="content")in o&&(o.innerHTML="<p "+l+'="'+m+'"></p>',o[s].childNodes[0].getAttribute(l)==m)||(m="_dt: "+m.slice(1,-1)+";");var d="\x3c!--"+m+"--\x3e",v=8,b=11,x=1,w=3,N=/^(?:style|textarea)$/i,y=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var M=" \\f\\n\\r\\t",k="[^ "+M+"\\/>\"'=]+",C="[ "+M+"]+"+k,E="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",T="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+k+"))?)",_=new RegExp(E+C+T+"+)([ "+M+"]*/?>)","g"),A=new RegExp(E+C+T+"*)([ "+M+"]*/>)","g"),$=new RegExp("("+C+"\\s*=\\s*)(['\"]?)"+d+"\\2","gi");function L(e,t,n,r){return"<"+t+n.replace($,H)+r}function H(e,t,n){return t+(n||'"')+m+(n||'"')}function S(e,t,n){return y.test(t)?e:"<"+t+n+"></"+t+">"}var O={};try{O.Map=Map}catch(e){O.Map=function(){var n=0,r=[],a=[];return{delete:function(e){var t=i(e);return t&&(r.splice(n,1),a.splice(n,1)),t},get:function(e){return i(e)?a[n]:void 0},has:function(e){return i(e)},set:function(e,t){return a[i(e)?n:r.push(e)-1]=t,this}};function i(e){return-1<(n=r.indexOf(e))}}}var R=O.Map,W="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")};function j(e,t,n){return{type:e,name:n,node:t,path:function(e){var t,n=[];switch(e.nodeType){case x:case b:t=e;break;case v:t=e.parentNode,D(n,t,e);break;default:t=e.ownerElement}for(;t=(e=t).parentNode;)D(n,t,e);return n}(t)}}function F(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function z(e,t,n){for(var r=new R,a=e.attributes,i=[],o=i.slice.call(a,0),u=o.length,c=0;c<u;){var s=o[c++];if(s.value===m){var l=s.name;if(!r.has(l)){var f=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),h=a[f]||a[f.toLowerCase()];r.set(l,h),t.push(j("attr",h,f))}i.push(s)}}for(u=i.length,c=0;c<u;){var p=i[c++];/^id$/i.test(p.name)?e.removeAttribute(p.name):e.removeAttributeNode(p)}var d=e.nodeName;if(/^script$/i.test(d)){var v=g.createElement(d);for(u=a.length,c=0;c<u;)v.setAttributeNode(a[c++].cloneNode(!0));v.textContent=e.textContent,e.parentNode.replaceChild(v,e)}}function D(e,t,n){e.unshift(e.indexOf.call(t.childNodes,n))}var P=new f,Z=new f;function q(o,u){var e=u.join(d).replace(A,S).replace(_,L),t=o.transform;t&&(e=t(e));var n=h(e,o.type),c=[];!function e(t,n,r){for(var a=t.childNodes,i=a.length,o=0;o<i;){var u=a[o++];switch(u.nodeType){case x:z(u,n,r),e(u,n,r);break;case v:u.textContent===m&&(r.shift(),n.push(N.test(t.nodeName)?j("text",t):j("any",u)));break;case w:N.test(t.nodeName)&&W.call(u.textContent)===d&&(r.shift(),n.push(j("text",t)))}}}(n,c,u.slice(0));var r={content:n,updates:function(r){for(var a=[],i=c.length,e=0;e<i;){var t=c[e++],n=F(r,t.path);switch(t.type){case"any":a.push(o.any(n,[]));break;case"attr":a.push(o.attribute(n,t.name,t.node));break;case"text":a.push(o.text(n)),n.textContent=""}}return function(){var e=arguments.length,t=e-1,n=1;if(i!==t)throw new Error(t+" values instead of "+i+"\n"+u.join(", "));for(;n<e;)a[n-1](arguments[n++]);return r}}};return P.set(u,r),r}return function(u){return function(e){var t,n,r,a,i,o=Z.get(u);return null!=o&&o.template===e||(t=u,n=e,r=P.get(n)||q(t,n),a=p.call(g,r.content,!0),i={content:a,template:n,updates:r.updates(a)},Z.set(t,i),o=i),o.updates.apply(null,arguments),o.content}}}(document);
return domtagger}));

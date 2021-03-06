require('basichtml').init();

var domtagger = require('../cjs').default;

var options = {
  type: 'html',
  attribute(node, name) {
    return value => {
      node[name] = value;
    }
  },
  any(node) {
    if (node.nodeType === 8)
      node = node.parentNode;
    return html => {
      node.innerHTML = html;
    };
  },
  text(node) {
    return textContent => {
      node.textContent = textContent;
    };
  }
};

var content = domtagger(options)`
<div onclick=${e => e.preventDefault()}>
  <div>${'html'}</div>
  <!-- not related -->
  <textarea attr = ${'another one'}>${'text'}</textarea>
  <textarea sparse="${'a'}b${'c'}">note related</textarea>
  <span id=${'drop'} />
  <script>window.alert('it works!');</script>
  <hr />
  <!--/* still here -->
  <!--/* hidden */-->
  <!--👻 also hidden -->
</div>`;

console.log(content.firstChild.outerHTML);

console.assert(content.nodeType === 11);
console.assert(-1 < content.firstChild.innerHTML.indexOf('<!--/* still here -->'));
console.assert(-1 === content.firstChild.innerHTML.indexOf('<!--/* hidden */-->'));
console.assert(-1 === content.firstChild.innerHTML.indexOf('<!--👻 also hidden -->'));

options.transform = function (html) {
  return html.replace('<hr', '<br');
};

var html = domtagger(options);
content = render();
console.assert(content === render());

console.assert(content.nodeType === 11);

try {
  content = ((template, ...values) => html(template))`
    <div onclick=${e => e.preventDefault()}></div>`;
  console.assert(false, 'this should not happen');
} catch (error) {
  console.assert(error.message.length, 'valid error');
}

delete require.cache[require.resolve('domconstants')];
delete require.cache[require.resolve('domsanitizer')];
delete require.cache[require.resolve('../cjs/index.js')];

document.createElement = function () { return {}; };

domtagger = require('../cjs').default;

function render() {
  return html`
  <div onclick=${e => e.preventDefault()}>
    <hr />
  </div>`;
}

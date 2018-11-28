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
  <textarea>note related</textarea>
  <span id=${'drop'} />
  <script>window.alert('it works!');</script>
  <hr />
</div>`;

console.assert(content.nodeType === 11);

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

delete require.cache[require.resolve('../cjs/constants.js')];
delete require.cache[require.resolve('../cjs/index.js')];
delete require.cache[require.resolve('../cjs/sanitizer.js')];

document.createElement = function () { return {}; };

domtagger = require('../cjs').default;

function render() {
  return html`
  <div onclick=${e => e.preventDefault()}>
    <hr />
  </div>`;
}

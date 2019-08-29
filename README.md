# domtagger

[![Build Status](https://travis-ci.com/WebReflection/domtagger.svg?branch=master)](https://travis-ci.com/WebReflection/domtagger) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/domtagger/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/domtagger?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/domtagger.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)

The [hyperHTML](https://github.com/WebReflection/hyperHTML#hyperhtml)'s template literal parser, used to handle all repeated updates per each attribute or node.

  * CDN as global utility, via https://unpkg.com/domtagger
  * ESM via `import domtagger from 'domtagger'`
  * CJS via `const domtagger = require('domtagger')`

[Live test](https://webreflection.github.io/domtagger/test/)

### Example

The tagger accepts a configuration object with mandatory methods that should return a function to invoke per each update.

Optionally, the object could have a `type` property, as either `html` or `svg` string, and a `transform` method that must return some string as content, after receiving the markup that is going to be used.

```js
var html = domtagger({

  // can be html or svg
  type: 'html',

  // how to handle attributes
  // Note: this callback is simplified for example purpose.
  // The node is the attribute owner
  attribute: function (node, name, attribute) {
    return function (value) {
      var type = typeof value;
      if (type === 'boolean' || type === 'function')
        node[name] = value;
      else if (value == null)
        node.removeAttribute(name);
      else
        node.setAttribute(name, value);
    }
  },

  // how to handle generic content
  // Note: this callback is simplified for example purpose.
  // The comment node is the hole placeholder
  // use domdiff or other techniques to handle nodes
  any: function (comment, childNodes) {
    var parentNode = comment.parentNode;
    return function (html) {
      parentNode.innerHTML = html;
    };
  },

  // how to handle cases where content
  // can only be some text
  // The node is one that can only have text
  text: function (node) {
    return function (textContent) {
      node.textContent = textContent;
    };
  },

  // OPTIONAL
  // a man in the middle for the output
  // The html string is what will be used to generate the content
  // this is always invoked after sanitizing the template parts
  transform: function (html) {
    // it must return the eventually transformed html
    return html;
  },

  // for adventurous 3rd parts libraries only:
  // previously internally known as `sanitize`,
  // it will run before transform and it must return a *string*
  // that contains domconstants.UID/UIDC in the right place
  // or the whole library will break
  convert: function (template) {
    // see domsanitizer logic
    // https://github.com/WebReflection/domsanitizer/blob/master/esm/index.js
    // or see a possible wrap solution/hint/workaround
    // https://github.com/WebReflection/domtagger/issues/17#issuecomment-526151473
    return template.join(domconstants.UIDC).replace(sani, tize);
  }

});

document.body.appendChild(
  render({
    onclick: function (e) {
      alert(e.currentTarget.outerHTML);
    },
    html: 'Hello <strong>domtagger</strong>!',
    text: "isn't this cool?"
  })
);

// render example
function render(model) {
  return html`
    <div onclick=${model.onclick}>
      <!--/* html is sanitized as text automatically */-->
      <div>${model.html}</div>
      <!--👻 textarea can use value=... or its content -->
      <textarea>${model.text}</textarea>
    </div>
  `;
}
```

#### About devs-only comments

If you'd like to create a dev only comment that will be removed at runtime once parsed, you can either start the comment with a ghost emoji 👻 or use `/*` and `*/` right at the boundaries of the comment.

```html
<!--👻 dev only -->
<!--/* also dev only */-->
<!-- any other regular comment -->
```

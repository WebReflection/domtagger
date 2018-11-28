'use strict';
// globals
const Symbol = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/essential-symbol'));
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));

// utils
const createContent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/create-content'));
const importNode = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/import-node'));

// local
const sanitize = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./sanitizer.js'));
const {slice} = require('./utils.js');
const {find, parse} = require('./walker.js');

// the domtagger 🎉
Object.defineProperty(exports, '__esModule', {value: true}).default = domtagger;

var update = Symbol();
var updates = new WeakMap;
var parsed = new WeakMap;

Object.defineProperty(
  // also known as DocumentFragment
  document.createDocumentFragment().constructor.prototype,
  update,
  {
    value: function () {
      return updates.get(this).apply(this, arguments);
    }
  }
);

function createInfo(options, template) {
  var markup = sanitize(template);
  var transform = options.transform;
  if (transform)
    markup = transform(markup);
  var content = createContent(markup, options.type);
  var holes = [];
  parse(content, holes, template.slice(0));
  var info = {
    content: content,
    updates: function (fragment) {
      var updates = [];
      var i = 0;
      var len = holes.length;
      while (i < len) {
        var info = holes[i++];
        var node = find(fragment, info.path);
        switch (info.type) {
          case 'any':
            updates.push(options.any(node, []));
            break;
          case 'attr':
            updates.push(options.attribute(node, info.name, info.node));
            break;
          case 'text':
            updates.push(options.text(node));
            node.textContent = '';
            break;
        }
      }
      return function () {
        var i = 0;
        var length = arguments.length;
        if (len !== length) {
          throw new Error(
            length + ' values instead of ' + len + '\n' +
            template.join(', ')
          );
        }
        while (i < length)
          updates[i](arguments[i++]);
        return fragment;
      };
    }
  };
  parsed.set(template, info);
  return info;
}

function domtagger(options) {
  return function (template) {
    var info = parsed.get(template) || createInfo(options, template);
    var content = importNode.call(document, info.content, true);
    updates.set(content, info.updates(content));
    return content[update].apply(content, slice.apply(1, arguments));
  };
}

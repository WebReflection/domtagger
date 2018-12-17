'use strict';
const Map = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/essential-map'));
const trim = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/trim'));

const {
  UID, UIDC, COMMENT_NODE, DOCUMENT_FRAGMENT_NODE, ELEMENT_NODE, SHOULD_USE_TEXT_CONTENT, TEXT_NODE
} = require('./constants.js');

exports.find = find;
exports.parse = parse;

var index = -1;

function create(type, node, name) {
  return {type: type, name: name, node: node, path: createPath(node)};
}

function createPath(node) {
  var parentNode;
  var path = [];
  switch (node.nodeType) {
    case ELEMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      parentNode = node;
      break;
    case COMMENT_NODE:
      parentNode = node.parentNode;
      prepend(path, parentNode, node);
      break;
    default:
      parentNode = node.ownerElement;
      break;
  }
  while ((parentNode = (node = parentNode).parentNode))
    prepend(path, parentNode, node);
  return path;
}

function find(node, path) {
  var length = path.length;
  var i = 0;
  while (i < length)
    node = node.childNodes[path[i++]];
  return node;
}

function parse(node, paths, parts) {
  var childNodes = node.childNodes;
  var length = childNodes.length;
  var i = 0;
  while (i < length) {
    var child = childNodes[index = i++];
    switch (child.nodeType) {
      case ELEMENT_NODE:
        parseAttributes(child, paths, parts);
        parse(child, paths, parts);
        break;
      case COMMENT_NODE:
        if (child.textContent === UID) {
          parts.shift();
          paths.push(
            // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
              create('text', node) :
              create('any', child)
          );
        }
        break;
      case TEXT_NODE:
        // the following ignore is actually covered by browsers
        // only basicHTML ends up on previous COMMENT_NODE case
        // instead of TEXT_NODE because it knows nothing about
        // special style or textarea behavior
        /* istanbul ignore if */
        if (
          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
          trim.call(child.textContent) === UIDC
        ) {
          parts.shift();
          paths.push(create('text', node));
        }
        break;
    }
  }
}

function parseAttributes(node, paths, parts) {
  var cache = new Map;
  var attributes = node.attributes;
  var remove = [];
  var array = remove.slice.call(attributes, 0);
  var length = array.length;
  var i = 0;
  while (i < length) {
    var attribute = array[i++];
    if (attribute.value === UID) {
      var name = attribute.name;
      // the following ignore is covered by IE
      // and the IE9 double viewBox test
      /* istanbul ignore else */
      if (!cache.has(name)) {
        var realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/, '$1');
        var value = attributes[realName] ||
                      // the following ignore is covered by browsers
                      // while basicHTML is already case-sensitive
                      /* istanbul ignore next */
                      attributes[realName.toLowerCase()];
        cache.set(name, value);
        paths.push(create('attr', value, realName));
      }
      remove.push(attribute);
    }
  }
  length = remove.length;
  i = 0;
  while (i < length) {
    // Edge HTML bug #16878726
    var attr = remove[i++];
    if (/^id$/i.test(attr.name))
      node.removeAttribute(attr.name);
    // standard browsers would work just fine here
    else
      node.removeAttributeNode(attr);
  }

  // This is a very specific Firefox/Safari issue
  // but since it should be a not so common pattern,
  // it's probably worth patching regardless.
  // Basically, scripts created through strings are death.
  // You need to create fresh new scripts instead.
  // TODO: is there any other node that needs such nonsense?
  var nodeName = node.nodeName;
  if (/^script$/i.test(nodeName)) {
    // this used to be like that
    // var script = createElement(node, nodeName);
    // then Edge arrived and decided that scripts created
    // through template documents aren't worth executing
    // so it became this ... hopefully it won't hurt in the wild
    var script = document.createElement(nodeName);
    length = attributes.length;
    i = 0;
    while (i < length)
      script.setAttributeNode(attributes[i++].cloneNode(true));
    script.textContent = node.textContent;
    node.parentNode.replaceChild(script, node);
  }
}

function prepend(path, parent, node) {
  // the first index represent the node position
  // after that, it needs to be found.
  // this speeds up repeated holes on the same template literal
  // avoiding accessing the childNodes when the index is already known
  path.unshift(
    index < 0 ?
      path.indexOf.call(parent.childNodes, node) :
      index
  );
  index = -1;
}

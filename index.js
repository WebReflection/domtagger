var domtagger = (function (document) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  var self = null || /* istanbul ignore next */ {};
  try { self.Symbol = Symbol; }
  catch(Symbol) {
    (function (String, dict, id) {    Symbol.for = function (name) {
        return dict[name] || (dict[name] = Symbol(id++));
      };
      self.Symbol = Symbol;
      function Symbol(name) {
        return new String('Symbol(_@ungap/' + name + ')');
      }
    }(String, Object.create(null), Math.random()));
  }
  var Symbol$1 = self.Symbol;

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null || /* istanbul ignore next */ {};
  try { self$1.WeakMap = WeakMap; }
  catch (WeakMap) {
    // this could be better but 90% of the time
    // it's everything developers need as fallback
    self$1.WeakMap = (function (id, Object) {    var dP = Object.defineProperty;
      var hOP = Object.hasOwnProperty;
      var proto = WeakMap.prototype;
      proto.delete = function (key) {
        return this.has(key) && delete key[this._];
      };
      proto.get = function (key) {
        return this.has(key) ? key[this._] : void 0;
      };
      proto.has = function (key) {
        return hOP.call(key, this._);
      };
      proto.set = function (key, value) {
        dP(key, this._, {configurable: true, value: value});
        return this;
      };
      return WeakMap;
      function WeakMap(iterable) {
        dP(this, '_', {value: '_@ungap/weakmap' + id++});
        if (iterable)
          iterable.forEach(add, this);
      }
      function add(pair) {
        this.set(pair[0], pair[1]);
      }
    }(Math.random(), Object));
  }
  var WeakMap$1 = self$1.WeakMap;

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = (function (document, forEach) {  var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = 'content' in create(TEMPLATE);

    var createHTML = HAS_CONTENT ?
      function (html) {
        var template = create(TEMPLATE);
        template.innerHTML = html;
        return template.content;
      } :
      function (html) {
        var content = create(FRAGMENT);
        var template = create(TEMPLATE);
        var childNodes = null;
        if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
          var selector = RegExp.$1;
          template.innerHTML = '<table>' + html + '</table>';
          childNodes = template.querySelectorAll(selector);
        } else {
          template.innerHTML = html;
          childNodes = template.childNodes;
        }
        forEach.call(childNodes, append, content);
        return content;
      };

    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(child) {
      this.appendChild(child);
    }

    function create(element) {
      return element === FRAGMENT ?
        document.createDocumentFragment() :
        document.createElement(element);
    }

    // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE
    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      forEach.call(template.firstChild.childNodes, append, content);
      return content;
    }

  }(document, [].forEach));

  /*! (c) Andrea Giammarchi - ISC */
  var importNode = (function (
    document,
    appendChild,
    cloneNode,
    createTextNode,
    importNode
  ) {
    var native = importNode in document;
    // IE 11 has problems with cloning templates:
    // it "forgets" empty childNodes. This feature-detects that.
    var fragment = document.createDocumentFragment();
    fragment[appendChild](document[createTextNode]('g'));
    fragment[appendChild](document[createTextNode](''));
    var content = native ?
      document[importNode](fragment, true) :
      fragment[cloneNode](true);
    return content.childNodes.length < 2 ?
      function importNode(node, deep) {
        var clone = node[cloneNode]();
        for (var
          childNodes = node.childNodes || [],
          length = childNodes.length,
          i = 0; deep && i < length; i++
        ) {
          clone[appendChild](importNode(childNodes[i], deep));
        }
        return clone;
      } :
      (native ?
        document[importNode] :
        function (node, deep) {
          return node[cloneNode](!!deep);
        }
      );
  }(
    document,
    'appendChild',
    'cloneNode',
    'createTextNode',
    'importNode'
  ));

  // Custom
  var UID = '-0' + Math.random() + '0%';
  var UIDC = '<!--' + UID + '-->';

  // DOM
  var COMMENT_NODE = 8;
  var DOCUMENT_FRAGMENT_NODE = 11;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;

  var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  function sanitize (template) {
    return template.join(UIDC)
            .replace(selfClosing, fullClosing)
            .replace(attrSeeker, attrReplacer);
  }

  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
  var attrName = '[ ' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
  var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';

  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)', 'g');
  var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

  function attrReplacer($0, $1, $2, $3) {
    return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  }

  function replaceAttributes($0, $1, $2) {
    return $1 + ($2 || '"') + UID + ($2 || '"');
  }

  function fullClosing($0, $1, $2) {
    return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
  }

  var trim = ''.trim || function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  function slice() {
    var out = [];
    var i = 0;
    var j = +this;
    var length = arguments.length;
    while (j < length)
      out[i++] = arguments[j++];
    return out;
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self$2 = null || /* istanbul ignore next */ {};
  try { self$2.Map = Map; }
  catch (Map) {
    self$2.Map = function Map() {
      var i = 0;
      var k = [];
      var v = [];
      return {
        delete: function (key) {
          var had = contains(key);
          if (had) {
            k.splice(i, 1);
            v.splice(i, 1);
          }
          return had;
        },
        get: function get(key) {
          return contains(key) ? v[i] : void 0;
        },
        has: function has(key) {
          return contains(key);
        },
        set: function set(key, value) {
          v[contains(key) ? i : (k.push(key) - 1)] = value;
          return this;
        }
      };
      function contains(v) {
        i = k.indexOf(v);
        return -1 < i;
      }
    };
  }
  var Map$1 = self$2.Map;

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
    var i = 0;
    var length = path.length;
    while (i < length)
      node = node.childNodes[path[i++]];
    return node;
  }

  function parse(node, paths, parts) {
    var i = 0;
    var childNodes = node.childNodes;
    var length = childNodes.length;
    while (i < length) {
      var child = childNodes[i++];
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
    var cache = new Map$1;
    var attributes = node.attributes;
    var array = slice.apply(0, attributes);
    var remove = [];
    var i = 0;
    var length = array.length;
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
    i = 0;
    length = remove.length;
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
      i = 0;
      length = attributes.length;
      while (i < length)
        script.setAttributeNode(attributes[i++].cloneNode(true));
      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  }

  function prepend(path, parent, node) {
    path.unshift(path.indexOf.call(parent.childNodes, node));
  }

  // globals

  var update = Symbol$1();
  var updates = new WeakMap$1;
  var parsed = new WeakMap$1;

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

  

  return domtagger;

}(document));

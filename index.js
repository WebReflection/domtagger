var domtagger = (function (document) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  var self = null || /* istanbul ignore next */ {};
  try { self.WeakMap = WeakMap; }
  catch (WeakMap) {
    // this could be better but 90% of the time
    // it's everything developers need as fallback
    self.WeakMap = (function (id, Object) {    var dP = Object.defineProperty;
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
  var WeakMap$1 = self.WeakMap;

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = (function (document) {  var FRAGMENT = 'fragment';
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
        append(content, childNodes);
        return content;
      };

    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;
      while (length--)
        root.appendChild(childNodes[0]);
    }

    function create(element) {
      return element === FRAGMENT ?
        document.createDocumentFragment() :
        document.createElementNS('http://www.w3.org/1999/xhtml', element);
    }

    // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE
    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }

  }(document));

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

  var trim = ''.trim || function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  /*! (c) Andrea Giammarchi - ISC */

  // Custom
  var UID = '-' + Math.random().toFixed(6) + '%';
  //                           Edge issue!

  var UID_IE = false;

  try {
    if (!(function (template, content, tabindex) {
      return content in template && (
        (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>'),
        template[content].childNodes[0].getAttribute(tabindex) == UID
      );
    }(document.createElement('template'), 'content', 'tabindex'))) {
      UID = '_dt: ' + UID.slice(1, -1) + ';';
      UID_IE = true;
    }
  } catch(meh) {}

  var UIDC = '<!--' + UID + '-->';

  // DOM
  var COMMENT_NODE = 8;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;

  var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  /*! (c) Andrea Giammarchi - ISC */

  function sanitize (template) {
    return template.join(UIDC)
            .replace(selfClosing, fullClosing)
            .replace(attrSeeker, attrReplacer);
  }

  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^' + spaces + '\\/>"\'=]+';
  var attrName = '[' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
  var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';

  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
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

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null || /* istanbul ignore next */ {};
  try { self$1.Map = Map; }
  catch (Map) {
    self$1.Map = function Map() {
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
        forEach: function forEach(callback, context) {
          k.forEach(
            function (key, i)  {
              callback.call(context, v[i], key, this);
            },
            this
          );
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
  var Map$1 = self$1.Map;

  function find(node, path) {
    var length = path.length;
    var i = 0;
    while (i < length)
      node = node.childNodes[path[i++]];
    return node;
  }

  function parse(node, holes, parts, path) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;
    while (i < length) {
      var child = childNodes[i];
      switch (child.nodeType) {
        case ELEMENT_NODE:
          var childPath = path.concat(i);
          parseAttributes(child, holes, parts, childPath);
          parse(child, holes, parts, childPath);
          break;
        case COMMENT_NODE:
          var textContent = child.textContent;
          if (textContent === UID) {
            parts.shift();
            holes.push(
              // basicHTML or other non standard engines
              // might end up having comments in nodes
              // where they shouldn't, hence this check.
              SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
                Text(node, path) :
                Any(child, path.concat(i))
            );
          } else {
            switch (textContent.slice(0, 2)) {
              case '/*':
                if (textContent.slice(-2) !== '*/')
                  break;
              case '\uD83D\uDC7B': // ghost
                node.removeChild(child);
                i--;
                length--;
            }
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
            holes.push(Text(node, path));
          }
          break;
      }
      i++;
    }
  }

  function parseAttributes(node, holes, parts, path) {
    var cache = new Map$1;
    var attributes = node.attributes;
    var remove = [];
    var array = remove.slice.call(attributes, 0);
    var length = array.length;
    var i = 0;
    while (i < length) {
      var attribute = array[i++];
      var direct = attribute.value === UID;
      var sparse;
      if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
        var name = attribute.name;
        // the following ignore is covered by IE
        // and the IE9 double viewBox test
        /* istanbul ignore else */
        if (!cache.has(name)) {
          var realName = parts.shift().replace(
            direct ?
              /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ :
              // TODO: while working on yet another IE/Edge bug I've realized
              //        the current not direct logic easily breaks there
              //        because the `name` might not be the real needed one.
              //        Use a better RegExp to find last attribute instead
              //        of trusting `name` is what we are looking for.
              //        Thanks IE/Edge, I hate you both.
              new RegExp(
                '^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")[\\S\\s]*',
                'i'
              ),
              '$1'
          );
          var value = attributes[realName] ||
                        // the following ignore is covered by browsers
                        // while basicHTML is already case-sensitive
                        /* istanbul ignore next */
                        attributes[realName.toLowerCase()];
          cache.set(name, value);
          if (direct)
            holes.push(Attr(value, path, realName, null));
          else {
            var skip = sparse.length - 2;
            while (skip--)
              parts.shift();
            holes.push(Attr(value, path, realName, sparse));
          }
        }
        remove.push(attribute);
      }
    }
    length = remove.length;
    i = 0;

    /* istanbul ignore next */
    var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);
    while (i < length) {
      // Edge HTML bug #16878726
      var attr = remove[i++];
      // IE/Edge bug lighterhtml#63 - clean the value or it'll persist
      /* istanbul ignore next */
      if (cleanValue)
        attr.value = '';
      // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode
      node.removeAttribute(attr.name);
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

  function Any(node, path) {
    return {
      type: 'any',
      node: node,
      path: path
    };
  }

  function Attr(node, path, name, sparse) {
    return {
      type: 'attr',
      node: node,
      path: path,
      name: name,
      sparse: sparse
    };
  }

  function Text(node, path) {
    return {
      type: 'text',
      node: node,
      path: path
    };
  }

  // globals

  var parsed = new WeakMap$1;
  var referenced = new WeakMap$1;

  function createInfo(options, template) {
    var markup = (options.convert || sanitize)(template);
    var transform = options.transform;
    if (transform)
      markup = transform(markup);
    var content = createContent(markup, options.type);
    cleanContent(content);
    var holes = [];
    parse(content, holes, template.slice(0), []);
    var info = {
      content: content,
      updates: function (content) {
        var updates = [];
        var len = holes.length;
        var i = 0;
        var off = 0;
        while (i < len) {
          var info = holes[i++];
          var node = find(content, info.path);
          switch (info.type) {
            case 'any':
              updates.push({fn: options.any(node, []), sparse: false});
              break;
            case 'attr':
              var sparse = info.sparse;
              var fn = options.attribute(node, info.name, info.node);
              if (sparse === null)
                updates.push({fn: fn, sparse: false});
              else {
                off += sparse.length - 2;
                updates.push({fn: fn, sparse: true, values: sparse});
              }
              break;
            case 'text':
              updates.push({fn: options.text(node), sparse: false});
              node.textContent = '';
              break;
          }
        }
        len += off;
        return function () {
          var length = arguments.length;
          if (len !== (length - 1)) {
            throw new Error(
              (length - 1) + ' values instead of ' + len + '\n' +
              template.join('${value}')
            );
          }
          var i = 1;
          var off = 1;
          while (i < length) {
            var update = updates[i - off];
            if (update.sparse) {
              var values = update.values;
              var value = values[0];
              var j = 1;
              var l = values.length;
              off += l - 2;
              while (j < l)
                value += arguments[i++] + values[j++];
              update.fn(value);
            }
            else
              update.fn(arguments[i++]);
          }
          return content;
        };
      }
    };
    parsed.set(template, info);
    return info;
  }

  function createDetails(options, template) {
    var info = parsed.get(template) || createInfo(options, template);
    var content = importNode.call(document, info.content, true);
    var details = {
      content: content,
      template: template,
      updates: info.updates(content)
    };
    referenced.set(options, details);
    return details;
  }

  function domtagger(options) {
    return function (template) {
      var details = referenced.get(options);
      if (details == null || details.template !== template)
        details = createDetails(options, template);
      details.updates.apply(null, arguments);
      return details.content;
    };
  }

  function cleanContent(fragment) {
    var childNodes = fragment.childNodes;
    var i = childNodes.length;
    while (i--) {
      var child = childNodes[i];
      if (
        child.nodeType !== 1 &&
        trim.call(child.textContent).length === 0
      ) {
        fragment.removeChild(child);
      }
    }
  }

  

  return domtagger;

}(document));

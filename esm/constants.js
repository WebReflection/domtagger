// Custom
var NOT_IE = 'content' in document.createElement('template');
var UID = (NOT_IE ? '-' : '_dt: ') + Math.random().toFixed(6) + (NOT_IE ? '0%' : ';');
//                                              ^ Edge issue ^
var UIDC = '<!--' + UID + '-->';

// DOM
var COMMENT_NODE = 8;
var DOCUMENT_FRAGMENT_NODE = 11;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;

var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

export {
  UID, UIDC,
  COMMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
  ELEMENT_NODE,
  TEXT_NODE,
  SHOULD_USE_TEXT_CONTENT,
  VOID_ELEMENTS
};

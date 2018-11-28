'use strict';
const trim = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/trim'));

exports.slice = slice;
exports.trim = trim;

function slice() {
  var out = [];
  var i = 0;
  var j = +this;
  var length = arguments.length;
  while (j < length)
    out[i++] = arguments[j++];
  return out;
}

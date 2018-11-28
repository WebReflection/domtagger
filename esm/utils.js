import trim from '@ungap/trim';

export {slice, trim};

function slice() {
  var out = [];
  var i = 0;
  var j = +this;
  var length = arguments.length;
  while (j < length)
    out[i++] = arguments[j++];
  return out;
}

// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // null
  if (obj === null) {
    return 'null';
  }
  // strings: return the string w/ double quotes
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  // arrays, recursive
  if (Array.isArray(obj)) {
    if (!obj.length) {
      return '[]';
    } else {
      var elements = obj.map(stringifyJSON);
      return '[' + elements + ']';
    }
  }
  // objects, recursive
  if (typeof obj === 'object') {
    var keys = Object.keys(obj).filter(function(key) {
      return !(typeof obj[key] === 'function' || obj[key] === undefined);
    });
    if (keys.length) {
      var pairs = keys.map(function(key) {
        return stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
      });
      return '{' + pairs + '}';
    } else {
      return '{}';
    }
  } else {
    // covers all other cases (booleans, numbers, undefined)
    return String(obj);
  }
};
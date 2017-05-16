// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// helper function:
var slicer = function(string) {
  return string.slice(1, string.length - 1);
};

var parseJSON = function(json) {
  var output;
  // if first char of json string is a left bracket (start of an array)
  if (json[0] === '[') {
    // if length is 2 return an empty array
    if (json.length === 2) {
      return [];
    } else if (json.includes(', ')) {
    // else slice to exclude the brackets, and split on commas, recurse on each element
      var elements = slicer(json).split(', ');
      return elements.map(parseJSON);
    } else if (json.includes(',')) {
    // else slice to exclude the brackets, and split on commas, recurse on each element
      var elements = slicer(json).split(',');
      return elements.map(parseJSON);
    } else {
    // else if it's a single element array, return that element surrounded by brackets
      var element = slicer(json);
      return [parseJSON(element)];
    }
  }
  // if first character is a double-quote, return a string
  if (json[0] === '"') {
    return slicer(json);
  }
  // if first char is "n", return null
  if (json[0] === 'n') {
    return null;
  }
  // if first char either "t" or "f", return true or false
  if (json[0] === 't') {
    return true;
  }

  if (json[0] === 'f') {
    return false;
  }
  // if first char is "{", de-string the object
  if (json[0] === '{') {
    if (json.length > 2) {
      var splitPairs = [];
      var pairs = slicer(json).split(', ');
      pairs.forEach(function(pair) {
        splitPairs.push(pair.split(': '));
      });
      var obj = {};
      splitPairs.forEach(function(splitPair) {
        if (splitPair[0].includes(',') || (splitPair[0].includes('null'))) {
          obj[splitPair[0]] = parseJSON(splitPair[1]);
        } else {
          obj[parseJSON(splitPair[0])] = parseJSON(splitPair[1]);
        }
      });
      return obj;
    } else {
      return {};
    }
  } else {
    // else (only numbers should be left), convert to a number
    return Number(json);
  }
};